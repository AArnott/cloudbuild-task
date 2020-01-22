if (!(Test-Path "$PSScriptRoot\out")) {
	New-Item -ItemType Directory -Path "$PSScriptRoot\out" | Out-Null
}

Get-ChildItem "$PSScriptRoot\cloudbuild-task-*" |% {
	yarn pack --non-interactive --cwd $_.Name
	if ($LASTEXITCODE -ne 0) {
		exit $LASTEXITCODE
	}

	Move-Item -Path "$($_.FullName)\cloudbuild-task-*.tgz" -Destination "$PSScriptRoot\out"
}
