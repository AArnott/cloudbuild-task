$testOrder =
	'cloudbuild-task-local'

$failed = $false
$testOrder | % {
	Write-Host -ForegroundColor Blue "Testing $_"
	Push-Location "$PSScriptRoot\$_"
	try {
		yarn jest
		if ($LASTEXITCODE -ne 0) {
			$failed = $true
		}
	}
	finally {
		Pop-Location
	}
}

if ($failed) {
	Write-Host -ForegroundColor Red "Overall test run failure"
	exit 1
}
