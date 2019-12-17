"use strict"


$(document).ready(function () {
	o2.init()
})

let o2 = {
	html5Slider : $('#html5')[0],
	yearinputIndex: 0,
	yearInputValue: $('#year').val(),
	monthInputValue: $('#month').val(),
	sliderMin: 4167,
	startSlider: 4167,
	exatly: 4,
	percentTax: $('.calculate__table-percent').eq(1),
	percentShare: $('.calculate__table-row-share').find('.calculate__table-percent'),
	numberShare: $('.calculate__table-row-share').find('.calculate__table-number'),
	divedendPercent: $('calculate__table-row-dividends').find('.calculate__table-percent'),
	demoPercent: 0,
	init() 
	{	
		//  this.tableDataChange(0)
		 //this.open()
		 this.initSlider()
		 this.slider()
		 this.calcYear()
		 this.calcMonth()
		 this.monthInputChange()
		 this.startValue()
		 this.yearInputChange()
		 //this.clickList()
		 //this.dropDownClick(0,0)
		 this.dropDownInit()
	},

	startValue() {
		$('#month').val((4167).toLocaleString('ru-RU'));
		$('#year').val((50000).toLocaleString('ru-RU'));
	},
	aue() {
		console.log('aue');	
	},
	cards: [
		{
			percent1: 30,
			'percent2': 6,
			'totalpercent': 36,
			'label': 'средний уровеь риска',
			'id': 0
		},
		{
			percent1: 19,
			'percent2': 6,
			 'totalpercent': 25,
			'label': 'с небольшим риском',
			 'id': 1
		},
		{
			percent1: 15,
			'percent2': 0,
			'totalpercent': 15,
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
	dropDownInit() {
		let calculateListItem = $('.calculate__list-item-wr').html();
		let items = '';

		for(let card of this.cards) {
			items += calculateListItem.replace(/#percent#/g, card.totalpercent )
									  .replace(/#label#/g, card.label )
									  .replace(/#id#/g, card.id )
									  .replace(/#item-id#/g, card.id)
		}
		$('.calculate__list').html(items); 
		$('.calculate__list').find('li').first().css('display', 'none');
		$('.strategy').find('.card').first().css('display', 'none')
	},

	sliderOptionsChange(num) {
		if (num == 4) {
			$('#year').val((330000).toLocaleString('ru-RU'));
			$('#month').val((330000 / 12).toLocaleString('ru-RU'));
			o2.sliderMin = 27500;
			o2.tableDataChange()
			o2.exatly = 0;
			o2.html5Slider.noUiSlider.updateOptions({
				range: {
					'min': o2.sliderMin,
					'max': 83333
				}
			})
		}else {
			o2.html5Slider.noUiSlider.updateOptions({
				range: {
					'min': 4167,
					'max': 83333
				}
			})
		}
	},

	dropDownClick(id, instance)
	{
		$('.calculate__list-down').find('.calculate__list-percent').html(o2.cards[id].totalpercent + '%');
		$('.calculate__list-down').find('.calculate__list-text').html(o2.cards[id].label);
		$('.calculate__list').toggleClass('calculate__list-open');

		$('.calculate__list-item[data-id="' + 2 + ' "]').each((index, item) => {
			if ($(item).data('item-id') === $(instance).data('item-id')){
				$(instance).hide();
			}
				
			else
				$(item).show();
		});

		this.calcIncome(id);

		$('.card__wr').each((index, cardItem) => {
			if ($(cardItem).data('id') === $(instance).data('item-id'))
			{
				$(cardItem).find()
				$('.card').show()
				$(cardItem).hide();
				$('.selected-strategy').addClass('card_active');
				$('.selected-strategy').html($(cardItem).html())
			}
			else 
			{
				$(cardItem).show();
				$(cardItem).removeClass('card_active');
			}
		});

		let num = id;
		o2.sliderOptionsChange(num);
		o2.tableDataChange(num);
		o2.calcSharePercent()
	},

	calcIncome(id, instance)
	{
		let cardsArr = o2.cards,
			CurrentPercent = cardsArr[id],
			YearInputValue = Number($('#year').val().replace(/[^+\d]/g, ''));

			o2.percentShare.text((CurrentPercent.percent1 - 13) + '%')
			let SharePercent = Number(parseFloat(o2.percentShare.text()));
			o2.demoPercent = SharePercent;
	},

	tableDataChange(num) {
	    let row1 = $('.calculate__table-number').first(),
			row2 = $('.calculate__table-number').eq(1),
			row3 = $('.calculate__table-number').eq(2),
			row4 = $('.calculate__table-number').eq(3),
			yearInputValue = Number($('#year').val().replace(/[^+\d]/g, ''));
	
		row1.text($('#year').val());
		if(yearInputValue < 400000) {
			row2.text(((yearInputValue / 100) * 13).toLocaleString('ru-RU'))
			o2.percentTax.text(13 + '%')
		}else {
			row2.text((52000).toLocaleString('ru-RU'))
			o2.percentTax.text((52000 / (yearInputValue / 100)).toFixed(2) + '%')
		}	
	},

	cardIncomeClick(instance) {
		$(instance).parent('card')
	},

	initSlider() {
		const slider = $('.calculate__slider');

		noUiSlider.create(slider, {
			start: o2.startSlider,
			connect: true,
			range: {
				'min': 4167,
				'max': 83333
			},
			step: 5000
		});
	},

	slider(id, instance) {
		const html5Slider = o2.html5Slider;
		html5Slider.noUiSlider.on('slide', function (values, handle) {
			let val = values[handle];
			val = Number(val);
			
			$('#month').val(val.toLocaleString('ru-RU'));
			val = Math.round(+val * 12 - o2.exatly);
			
			$('#year').val(val.toLocaleString('ru-RU'));
			o2.tableDataChange()
			o2.calcSharePercent()
		});
	},
	calcSharePercent() {
		o2.numberShare.text(Math.round(Number($('#year').val().replace(/[^+\d]/g, '') ) / 100 * o2.demoPercent ) )
	},
	
	calcYear() {
		const yearInput = $('#year'),
			  monthInput = $('#month');

		o2.monthInputValue = monthInput.val();
		o2.monthInputValue = o2.monthInputValue.replace(/[^+\d]/g, '');

		if (Number(o2.monthInputValue) > 4166) {
			yearInput.val(Math.round(o2.monthInputValue * 12).toLocaleString('ru-RU') );
		}else if(Number(o2.monthInputValue) < 4167) {
			o2.startValue();
		}else {
			//$('#month').val('monthValue');
		}
		o2.tableDataChange()
	},

	calcMonth() {
		const yearInput = $('#year'),
			  monthInput = $('#month');
		o2.yearInputValue = yearInput.val();
		o2.yearInputValue = o2.yearInputValue.replace(/[^+\d]/g, '');
			  
			  
		if (Number(o2.yearInputValue) > 50000) {
			monthInput.val(Math.round(o2.yearInputValue / 12).toLocaleString('ru-RU') );
		}else if(Number(o2.yearInputValue) < 50000) {
			o2.startValue();
		}else {
			//$('#year').val(yearValue);
		}
		o2.tableDataChange()
	},

	monthInputChange() {
		$('#month').on('change', function () {
			o2.html5Slider.noUiSlider.set([this.value.replace(/[^+\d]/g, ''), null]);
			
			o2.calcYear();
			// o2.yearInputIndex = Math.round($('#year').val());
			// $('.calculate__table-number:first').text(o2.yearInputIndex.toLocaleString('ru-RU'));
			o2.monthInputValue = Number($('#month').val().replace(/[^+\d]/g, ''));
			$('#month').val(o2.monthInputValue.toLocaleString('ru-RU'))
		});
	},

	yearInputChange() {
		$('#year').on('change', function () {
			o2.html5Slider.noUiSlider.set([(this.value.replace(/[^+\d]/g, '') / 12), null]);
			// yearIndex = Math.round(year.value);
			// $('.calculate__table-number:first').text(yearIndex.toLocaleString('ru-RU'));
			o2.calcMonth()
			o2.yearInputValue = Number($('#year').val().replace(/[^+\d]/g, ''));
			$('#year').val(o2.yearInputValue.toLocaleString('ru-RU'));
		});
	},

	open(instance) {
		$(instance).siblings('.calculate__list').toggleClass('calculate__list-open');
		$(instance).parent('.calculate__list-wrap').toggleClass('calculate__list-wrap_open');
		$('.calculate__list-down').toggleClass('calculate__list-down_open');
	},
	
	
}

