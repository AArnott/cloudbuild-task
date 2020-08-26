#!/usr/bin/env pwsh

if (!(Test-Path "$PSScriptRoot\out")) {
	New-Item -ItemType Directory -Path "$PSScriptRoot\out" | Out-Null
}

Get-ChildItem "$PSScriptRoot\cloudbuild-task-*" |% {
	Push-Location $_.FullName
	yarn pack -o ../out/%s-v%v.tgz
	if ($LASTEXITCODE -ne 0) {
		exit $LASTEXITCODE
	}

	Pop-Location
}
