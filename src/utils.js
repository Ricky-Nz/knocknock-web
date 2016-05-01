export function processStatus({running, error}, statusName = 'processing', status) {
	if (running) {
		return {...status, [statusName]: true};
	} else {
		return {...status, [statusName]: false, processSuccess: !error}
	}
}