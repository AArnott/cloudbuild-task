Write-Host -ForegroundColor Blue "Installing packages..."
yarn
if ($LASTEXITCODE -ne 0) {
	exit $LASTEXITCODE
}

$buildOrder =
	'cloudbuild-task-contracts',
	'cloudbuild-task-azp',
	'cloudbuild-task-github-actions',
	'cloudbuild-task-local'

$buildOrder |% {
	Write-Host -ForegroundColor Blue "Building $_"
	Push-Location "$PSScriptRoot\$_"
	yarn run build
	if ($LASTEXITCODE -ne 0) {
		exit $LASTEXITCODE
	}

	Pop-Location
}
