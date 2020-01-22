[CmdletBinding(SupportsShouldProcess = $true)]
Param (
	[Parameter(Mandatory = $true)]
	[string]$Version
)


Get-ChildItem "$PSScriptRoot\..\..\cloudbuild-task-*" -Directory | % {
	Write-Host -ForegroundColor Blue "Building $($_.Name)"
	Push-Location $_.FullName

	npm version $Version

	if ($LASTEXITCODE -ne 0) {
		exit $LASTEXITCODE
	}

	Pop-Location
}

Push-Location $PSScriptRoot
yarn up @aarnott/cloudbuild-task-contracts
Pop-Location
