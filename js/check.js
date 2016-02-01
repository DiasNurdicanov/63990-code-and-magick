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
	if ( (Array.isArray(a)) && !(Array.isArray(b)) ){

		var sum = a.reduce(function(result, current) {
		  return result + current;
		},0);

		return 'Я прошёл ' + sum + ' шагов';
	}
	
	//Проверка достижения левого края
	//Тут количество элементов должно быть одинаковым
	if ( Array.isArray(a) && Array.isArray(b) ){
		var length = a.reduce(function(result, current, i) {
		  var sum = current + b[i];

		  return result + sum;

		},0)

		return 'Я прошёл ' + length + ' метров';
	}
}
