$(document).ready(function () {
	o2.init()
});

let o2 = 
{
	slider: $('.calculate__slider')[0],
	currentId: 0,
	oldYearValue: $('.year-input').val(),
	oldMonthValue: $('.month-input').val(),
	init() 
	{
		this.dropDownInit();
		this.initSlider();
		this.sliderChange()
		this.InputChange();
		this.showHideCards(0);
		this.tableDataChange(0);
		this.startValue()
		
	},
	cards: 
	[
		{
			percent1: 30,
			'percent2': 6,
			'totalpercent': 36,
			'label': 'средний уровеь риска',
			'id': 0
		},
		{
			percent1: 20,
			'percent2': 5,
			 'totalpercent': 25,
			'label': 'с небольшим риском',
			 'id': 1
		},
		{
			percent1: 17,
			'percent2': 0,
			'totalpercent': 17,
			'label': 'с небольшим риском',
			'id': 2
		},
		{
			percent1: 20,
			'percent2': 0,
			'totalpercent': 20,
			'label': 'с небольшим риском',
			'id': 3
		},
		{
			percent1: 22,
			'percent2': 0,
			 'totalpercent': 22,
			'label': 'с небольшим риском',
			 'id': 4
		},
		{
			percent1: 13,
			'percent2': 0,
			 'totalpercent': 13,
			'label': 'без риска',
			 'id': 5
		},
		

	],
	formatNum(number)
    {
      return String(number).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
	},
	parseNum(number)
    {
      number = String(number);
      return number.replace(/\s+/g, '');
    },
	startValue() 
	{
		$('.month-input').val((4167).toLocaleString('ru-RU'));
		$('.year-input').val((50000).toLocaleString('ru-RU'));
	},
	maxValue()
	{
		$('.month-input').val((83333).toLocaleString('ru-RU'));
		$('.year-input').val((1000000).toLocaleString('ru-RU'));
	},
	dropDownInit() 
	{
		let calculateListItem = $('.calculate__list-item-wr').html();
		let items = '';

		for(let card of this.cards) {
			items += calculateListItem.replace(/#percent#/g, card.totalpercent )
									  .replace(/#label#/g, card.label )
									  .replace(/#id#/g, card.id )
									  .replace(/#item-id#/g, card.id)
		}
		$('.calculate__list').html(items); 
	},
	initSlider() 
	{
		noUiSlider.create(o2.slider, {
			animate: true,
			animationDuration: 500,
			start: 4167,
			connect: true,
			range: {
				'min': 4167,
				'max': 83333
			},
			step: 5000
		});
	},
	sliderChange() 
	{
		o2.slider.noUiSlider.on('slide', function (values, handle) {
			
			let id = o2.currentId;
			let val = values[handle];
			val = Number(val);
			
			
			$('.month-input').val(val.toLocaleString('ru-RU'));
			$('.year-input').val((val * 12).toLocaleString('ru-RU'));
			o2.tableDataChange(id);
		});
	},
	sliderOptionsChange(id) {
		if (id == 4) {
			$('.month-input').val(27500);
			
			o2.slider.noUiSlider.updateOptions({
				range: {
					'min': 27500,
					'max': 83333
				}
			})
			o2.calcYearValue();
			o2.calcMonthValue();
		}else {
			o2.slider.noUiSlider.updateOptions({
				range: {
					'min': 4167,
					'max': 83333
				}
			})
		}
	},
	dropDownClick(id)
	{
		this.currentId = id;
		this.openDropDown();
		this.showHideCards(id);
		this.sliderOptionsChange(id);
		this.hideRows(id)
		this.tableDataChange(id);
	},
	cardIncomeClick(instance)
	{
		let id = $(instance).closest('.card__wr').data('id');
		this.showHideCards(id);
		this.tableDataChange(id);
		$('html,body').animate({scrollTop:$('.calculator').offset().top+"px"},{duration:1E3});
	},
	openDropDown()
	{
		$('.calculate__list').toggleClass('calculate__list-open');
		$('.calculate__list-wrap').toggleClass('calculate__list-wrap_open');
		$('.calculate__list-down').toggleClass('calculate__list-down_open');
	},
	showHideCards(id) {
		$('.calculate__list-item').show()
		$('.calculate__list-item[data-item-id= ' + id + ' ]').hide()

		$('.show-percent').text(o2.cards[id].totalpercent + '%');
		$('.show-text').text(o2.cards[id].label);

		$('.card__wr').show();
		$('.selected-strategy').addClass('card_active');
		$('.selected-strategy').html($('.card__wr[data-id=' + id + ']').html())
		$('.card__wr[data-id=' + id + ']').hide();
	},
	tableDataChange(id) {
		let yearInputValue = $('.year-input').val(),
			sharePercent = o2.cards[id].percent1 - 13,
			dividendsPercent = o2.cards[id].percent2,
			totalPercent,
			taxPercent = 13;
			
		yearInputValue = o2.parseNum(yearInputValue);
		yearInputValue = +yearInputValue;	

		if(yearInputValue > 400000) {
			taxPercent = (52000 / (yearInputValue / 100)).toFixed(1)
		}else {
			taxPercent = 13;
		}

		$('.tax-percent').text(taxPercent + '%');
		$('.tax-sum').text(Math.round((yearInputValue / 100) * taxPercent).toLocaleString('ru-RU'));

		totalPercent = dividendsPercent + sharePercent + Number(taxPercent);
		$('.investment-sum').text(yearInputValue.toLocaleString('ru-RU'));
		$('.share-percent').text(sharePercent + '%');
		$('.share-sum').text(Math.round(yearInputValue / 100 * sharePercent).toLocaleString('ru-RU'));
		$('.dividends-percent').text(dividendsPercent + '%');
		$('.dividends-sum').text(Math.round(yearInputValue / 100 * dividendsPercent).toLocaleString('ru-RU'));

		if((totalPercent ^ 0) == totalPercent) {
			$('.total-percent').text(totalPercent + '%');
		}else {
			$('.total-percent').text(totalPercent.toPrecision(3) + '%');
		}

		$('.total-sum').text('=' + Math.round((yearInputValue / 100) * totalPercent + yearInputValue).toLocaleString('ru-RU'));	
	},
	hideRows(id)
	{
		$('.calculate__table-row-dividends').show();
		$('.calculate__table-row-share').show();
		if(id > 1) {
			$('.calculate__table-row-dividends').hide();
			if(id == 5) {
				$('.calculate__table-row-share').hide();
			}
		}
	},
	calcYearValue() 
	{
		let yearInputValue = $('.year-input').val(),
			monthInputValue = $('.month-input').val();

		monthInputValue = Number(o2.parseNum(monthInputValue));

		if (monthInputValue > 4166) {
			if(monthInputValue > 83333) {
				o2.maxValue()
			}else {
				yearInputValue = monthInputValue * 12
				$('.year-input').val(yearInputValue.toLocaleString('ru-Ru'))
				$('.month-input').val(monthInputValue.toLocaleString('ru-Ru'));
			}
			
		}else if(monthInputValue < 4167) {
			o2.startValue();
		}else  {
			$('.month-input').val(o2.oldMonthValue.toLocaleString('ru-RU'))
		}
	},

	calcMonthValue()  {
		let yearInputValue = $('.year-input').val(),
			monthInputValue = $('.month-input').val();

		yearInputValue = Number(o2.parseNum(yearInputValue));

		if (yearInputValue > 50000) {
			if(yearInputValue > 1000000) {
				o2.maxValue()
			}else {
				monthInputValue = yearInputValue / 12;
				$('.month-input').val(Math.round(monthInputValue).toLocaleString('ru-Ru'))
				$('.year-input').val(yearInputValue.toLocaleString('ru-Ru'))
			}
		}else if(yearInputValue < 50000) {
			o2.startValue();
		}else  {
			$('.year-input').val(o2.oldYearValue.toLocaleString('ru-RU'))
		}
	},

	InputChange() 
	{
		$('.year-input').on('focus', function() {
			o2.oldYearValue =  Number($('.year-input').val().replace(/\s+/g, ''));
			$('.year-input').val(o2.oldYearValue);
		});

		$('.month-input').on('focus', function() {
			o2.oldMonthValue =  Number($('.month-input').val().replace(/\s+/g, ''));
			$('.month-input').val(o2.oldMonthValue);
		});
		
		$('.month-input').on('change', function () {
			o2.slider.noUiSlider.set([this.value, null]);
			o2.calcYearValue();
			o2.tableDataChange(o2.currentId)
		});
		$('.year-input').on('change', function () {
			o2.slider.noUiSlider.set([+Math.round(this.value / 12), null]);
			o2.calcMonthValue();
			o2.tableDataChange(o2.currentId)
		});
	},
}