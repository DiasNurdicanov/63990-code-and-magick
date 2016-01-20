function getMessage(a,b) {
	if ( typeof a == 'boolean' ){

		if ( a ){
			return 'Я попал в ' + b;
		} else{
			return 'Я никуда не попал';
		};
	}
	else if ( typeof a == 'number' ){
		return 'Я прыгнул на ' + (a * 100) + ' сантиметров';
	}
	else if ( (typeof a == "object") && (a instanceof Array) ){
		console.log(a);

		var sum = 0;

		for (var i = 0; i < a.length; i++) {
			sum += a[i];
		};

		console.log(sum);

		return 'Я прошел ' + sum + ' шагов';
	}
	else if ( (typeof a == "object") && (a instanceof Array) && (typeof b == "object") && (b instanceof Array) ){

		var length = 0;

		for (var i = 0; i < a.length; i++) {
			var sum = a[i] + b[i];

			length += sum;
		};

		
		return 'Я прошел ' + length + ' метров';
	}
}