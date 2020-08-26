#!/usr/bin/env pwsh

$buildOrder =
	'cloudbuild-task-contracts',
	'cloudbuild-task-azp',
	'cloudbuild-task-github-actions',
	'cloudbuild-task-local'

$buildOrder |% {
	Write-Host -ForegroundColor Blue "Building $_"
	Push-Location "$PSScriptRoot\$_"
	try {
		yarn run build
		if ($LASTEXITCODE -ne 0) {
			exit $LASTEXITCODE
		}
	}
	finally {
		Pop-Location
	}
}
