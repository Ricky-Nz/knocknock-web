import request from 'superagent';

const API_ROOT = 'http://localhost:1337/api';

function fetch({method, path, headers, params, body, attachments}) {
	return new Promise((resolve, reject) => {
		var ajax = request(method, `${API_ROOT}${path}`)
			.query(params||{})
			.set(headers||{});

		if (attachments) {
			for (var key in attachments) {
				ajax.attach(key, attachments[key]);
			}

			if (body) {
				for (var key in body) {
					ajax.field(key, body[key]);
				}
			}
		} else if (body) {
			ajax.send(body);
		}
		
		ajax.end((err, res) => {
				if (err || !res.ok) {
					reject({message: (res.body&&res.body.error&&JSON.stringify(res.body.error))||(err&&err.message)||'Request failed'});
				} else {
					resolve(res.body);
				}
			});
	});
}

export default function ({dispatch, actionName, arg, ...args}) {
	dispatch({
		type: actionName,
		running: true,
		arg
	});

	fetch(args)
		.then(data => {
			dispatch({
				type: actionName,
				running: false,
				arg,
				data
			});
		}, error => {
			dispatch({
				type: actionName,
				running: false,
				arg,
				error
			});
		});
}