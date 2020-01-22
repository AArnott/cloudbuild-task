[CmdletBinding(SupportsShouldProcess = $true)]
Param (
	[Parameter(Mandatory = $true)]
	[string]$Version
)

Get-ChildItem "$PSScriptRoot\..\..\cloudbuild-task-*" -Directory | % {
	Write-Host -ForegroundColor Blue "Building $($_.Name)"
	Push-Location $_.FullName
	try {
		npm version $Version --allow-same-version

		if ($LASTEXITCODE -ne 0) {
			exit $LASTEXITCODE
		}
	}
	finally {
		Pop-Location
	}
}

Function Set-DependencyVersion($Path) {
	$packageJson = Get-Content "$Path/package.json" | ConvertFrom-Json
	$packageJson.dependencies.'cloudbuild-task-contracts' = $Version
	Set-Content -Path "$Path/package.json" -Value ($packageJson | ConvertTo-Json) -Encoding utf8
}

$dependencies =
	'cloudbuild-task-azp',
	'cloudbuild-task-github-actions',
	'cloudbuild-task-local'

$dependencies |% { Set-DependencyVersion($_) }
