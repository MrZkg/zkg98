export function getDeviceType() {
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		return 'mobile';
	} else if (/(Android)/i.test(navigator.userAgent)) {
		return 'mobile';
	} else {
		return 'pc';
	}
}

