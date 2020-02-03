# This script is necessary until https://github.com/kulshekhar/ts-jest/issues/1343 is fixed.
# In particular, we need this addressed: https://github.com/kulshekhar/ts-jest/issues/1109

$testOrder = Get-ChildItem "$PSScriptRoot\*cloudbuild-task-*" -Directory

$failed = $false
$testOrder | % {
	Write-Host -ForegroundColor Blue "Testing $($_.BaseName)"
	Push-Location $_
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
} else {
	Write-Host -ForegroundColor Green "All tests passed!"
}
