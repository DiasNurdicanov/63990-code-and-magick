function getMessage(a,b) {
	//Проверка выстрела
	if ( typeof a == 'boolean' ){
		if ( a ){
			return 'Я попал в ' + b;
		} else{
			return 'Я никуда не попал';
		};
	}

	//Проверка прыжка
	if ( typeof a == 'number' ){
		return 'Я прыгнул на ' + (a * 100) + ' сантиметров';
	}
	
	//Проверка достижения правого края
	//Кажется условие сильно сложное?)
	if ( (typeof a == "object") && (a instanceof Array) && !(typeof b == "object") && !(b instanceof Array) ){

		var sum = 0;

		for (var i = 0; i < a.length; i++) {
			sum += a[i];
		};

		return 'Я прошёл ' + sum + ' шагов';

	}
	
	//Проверка достижения левого края
	//Тут количество элементов должно быть одинаковым
	if ( (typeof a == "object") && (a instanceof Array) && (typeof b == "object") && (b instanceof Array) ){

		var length = 0;

		for (var i = 0; i < a.length; i++) {
			var sum = a[i] + b[i];

			length += sum;
		};

		return 'Я прошёл ' + length + ' метров';
	}
}
