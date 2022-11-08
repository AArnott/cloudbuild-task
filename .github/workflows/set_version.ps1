#!/usr/bin/env pwsh

[CmdletBinding(SupportsShouldProcess = $true)]
Param (
	[Parameter(Mandatory = $true)]
	[string]$Version
)


Get-ChildItem "$PSScriptRoot\..\..\cloudbuild-task-*" -Directory | % {
	Write-Host -ForegroundColor Blue "Setting version for package $($_.Name)"
	Push-Location $_.FullName
	try {
		yarn version $Version

		if ($LASTEXITCODE -ne 0) {
			exit $LASTEXITCODE
		}
	}
 finally {
		Pop-Location
	}
}
