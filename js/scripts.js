$(document).ready(function () {

    // показ/прятание header
    $(function() {
        var prevScrollPos = window.pageYOffset;
        window.onscroll = function() {
            var currentScrollPos = window.pageYOffset;
            if ((prevScrollPos > currentScrollPos) || (currentScrollPos < 91)) {
                document.querySelector(".header-wrapper").classList.remove("hidden");
            } else {
                document.querySelector(".header-wrapper").classList.add("hidden");
            }
            prevScrollPos = currentScrollPos;
        }
    });

    // управление мобильным меню
    $('.mobile-menu-toggler').on('click', function () {
        $('.circle').addClass('expand');
        $('.mobile-menu').addClass('opened');
        $('body').addClass('overflow-hidden');
    });

    $('.mobile-menu__close').on('click', function () {
        $('.circle').removeClass('expand');
        $('.mobile-menu').removeClass('opened');
        $('body').removeClass('overflow-hidden');
    });

    $(function () {
        $('select').selectpicker();
    });

    // верхний поиск - десктоп
    $('.header-search .icon-zoom').on('click', function () {
        $('.header-search').addClass('show');
        $('.header-search input').focus();
    });

    $('.header-search .icon-e-remove').on('click', function () {
        $('.header-search').removeClass('show');
        $('.header-search input').val('');
    });

    $('.header-search input').on('keyup', function (e) {
        if ($(this).val() !== '' && e.keyCode === 13) {
            window.location.href = "/search.html";
        }
    });

    

    // мобильный поиск
    $('.mobile-menu .search-link').on('click', function () {
        $(this).hide();
        $('.mobile-menu .mobile-search-input').addClass('d-flex');
        $('.mobile-search-input input').focus();
    });

    $('.mobile-search-input .icon-zoom').on('click', function () {
        if ($('.mobile-search-input input').val() !== '') {
            window.location.href = "/search.html";
        }
    });

    $('.mobile-search-input input').on('keyup', function (e) {
        if ($(this).val() !== '' && e.keyCode === 13) {
            window.location.href = "/search.html";
        }
    });

    $('.toggle-contact').on('click', function (e) {
        e.stopPropagation();
        var $schemeBlock = $(this).parents('.scheme-block');
        if ($schemeBlock.hasClass('show')) {
           $schemeBlock.removeClass('show');

        } else {
           $schemeBlock.addClass('show');
        }
        if ($schemeBlock.hasClass('opened')) {
            $schemeBlock.removeClass('opened');
            // $schemeBlock.trigger('click');
        }
    });

    //подключение ползунка в заявках
    var $slider = $("input.range-input");

    var values = ['Можно не сегодня', 'Можно не сегодня', 'Можно не сегодня', 'Можно не сегодня', 'Горит'];
    var formatter = (index) => values[index];
    
    $slider.slider({
        min: 0,
        max: 4,
        step: 1,
        value: 0,
        tooltip: 'show',
        tooltip_position: 'bottom',
        formatter: formatter
    });
    

    $slider.on('slide', function(event){
        var rangeSlider = $(event.target).parents('.range-slider');
        var tooltip = $('.tooltip-main');
        if (event.value === 0) {
            rangeSlider.removeClass('value-2-style');
            rangeSlider.removeClass('value-3-style');
            rangeSlider.addClass('value-1-style');
        } else
        if (event.value > 0 && event.value < 4) {
            rangeSlider.removeClass('value-1-style');
            rangeSlider.removeClass('value-3-style');
            rangeSlider.addClass('value-2-style');
        } else {
            rangeSlider.removeClass('value-1-style');
            rangeSlider.removeClass('value-2-style');
            rangeSlider.addClass('value-3-style');
        }
    });

    // datepicker



    pickmeup.defaults.locales['ru'] = {
        days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    };

    pickmeup.defaults.locale = 'ru';
    
    pickmeup.defaults.hide_on_select = true;

    if ($('#date').length) {
        pickmeup('#date', {
            format	: 'd-m-Y'
        }).get_date(true);
    }


    $('.calendar-icon').on('click', function() {
        $('#date').trigger('click');
    });
    // функция отрисовки синих линий
    function drawLines(element, current, unselect) {

        if (unselect) {
            if (element.parents('.scheme-item').next('.scheme-item').find('.connecting-line').length === 0) {
                element.parents('.scheme-item').next('.scheme-item').append('<div class="connecting-line"></div>');
            }

            var $firstInChildList = element.parents('.scheme-item').next('.scheme-item').find('.departments-list').find('.scheme-block:first');
            var $lastInChildList =  element.parents('.scheme-item').next('.scheme-item').find('.departments-list').find('.scheme-block:last');
            var topChildLine = $firstInChildList.offset().top + ($firstInChildList.outerHeight()/2) - $firstInChildList.parents('.scheme-item').offset().top;
            var bottomChild = $lastInChildList.offset().top + ($lastInChildList.outerHeight()/2) - $lastInChildList.parents('.scheme-item').offset().top;
            var thisTop = element.offset().top + (element.outerHeight()/2) - element.parents('.scheme-item').offset().top;

            var childLineHeight = thisTop < bottomChild ? Math.abs(bottomChild - topChildLine) : thisTop - topChildLine;


            element.parents('.scheme-item').next('.scheme-item').find('.connecting-line').css('height', childLineHeight + 'px');
            element.parents('.scheme-item').next('.scheme-item').find('.connecting-line').css('top', topChildLine + 'px');


            if (current) {
                var prevOpenedBlock =  element.parents('.scheme-item').prev('.scheme-item').find('.scheme-block.opened');
                var prevTop = prevOpenedBlock.offset().top + (prevOpenedBlock.outerHeight()/2) - prevOpenedBlock.parents('.scheme-item').offset().top;
                var thisTop = element.offset().top + (element.outerHeight()/2) - element.parents('.scheme-item').offset().top;
                var topCurrentLine = thisTop < prevTop ? thisTop : prevTop;
                var currentLineHeight = thisTop < prevTop ? prevTop - thisTop : thisTop - prevTop;

                element.parents('.scheme-item').find('.connecting-line').css('top', topCurrentLine + 'px');
                element.parents('.scheme-item').find('.connecting-line').css('height', currentLineHeight + 'px');
            }
        } else {
            var $firstInChildList = element.parents('.scheme-item').find('.departments-list').find('.scheme-block:first');
            var $lastInChildList =  element.parents('.scheme-item').find('.departments-list').find('.scheme-block:last');
            var top = $firstInChildList.offset().top + ($firstInChildList.outerHeight()/2) - $firstInChildList.parents('.scheme-item').offset().top;
            var bottom = $lastInChildList.offset().top + ($lastInChildList.outerHeight()/2) - $lastInChildList.parents('.scheme-item').offset().top;
            var height = bottom - top;

            element.parents('.scheme-item').find('.connecting-line').css('height', height + 'px');
            element.parents('.scheme-item').find('.connecting-line').css('top', top + 'px');
        }

    }

    //-----------------------------------------------------------ИЕРАРХИЯ-----------------------------------
    // Клик по блоку в иераархии подчинения и задание поведения в зависимости от типа блока
    // блок с классом person-block - это блок с человеком
    // departments-list - список отделов
    // people-list - список людей в отделе

    $(document).on('click', '.scheme-block', function () {
        var _this = $(this);

        // обрабатываем повторный клик по блоку
        if (_this.hasClass('opened')) {
            _this.removeClass('opened');

            // если больше трех столбцов то удаляем столбы после 3-го
            if (_this.parents('.scheme-item').index() >= 2) {
                for (var i = _this.parents('.scheme-item').index()+1; i <= $('.scheme .scheme-item').length; i++) {
                    $('.scheme .scheme-item:eq('+i+')').remove();
                }
            } else {
                for (var i = _this.parents('.scheme-item').index()+1; i < 3; i++) {
                    $('.scheme .scheme-item:eq('+i+')').empty();
                }

                if ($('.scheme .scheme-item').length > 3) {
                    for (var i = 3; i <= $('.scheme .scheme-item').length; i++) {
                        $('.scheme .scheme-item:eq('+i+')').remove();
                    }
                }
            }

            if (_this.hasClass('departments-block')) {
                _this.parents('.scheme-item').find('.people-list').remove();
                _this.parents('.departments-list').removeClass('unselect');
                _this.parents('.scheme-item').next('.scheme-item').find('.connecting-line').remove();
            }

            if (_this.parents('.people-list').length) {
                _this.parents('.scheme-item').find('.departments-list').removeClass('unselect');
            }

            drawLines(_this, true, false);


        // обрабатываем клик по блоку
        } else {
            _this.parents('.scheme-item').find('.scheme-block').removeClass('opened');
            _this.addClass('opened');

            // если больше трех столбцов то удаляем столбы после 3-го

            if (_this.parents('.scheme-item').index() >= 2) {
                for (var i = _this.parents('.scheme-item').index()+1; i <= $('.scheme .scheme-item').length; i++) {
                    $('.scheme .scheme-item:eq('+i+')').remove();
                }
            } else {
                for (var i = _this.parents('.scheme-item').index()+1; i < 3; i++) {
                    $('.scheme .scheme-item:eq('+i+')').empty();
                }

                if ($('.scheme .scheme-item').length > 3) {
                    for (var i = 3; i <= $('.scheme .scheme-item').length; i++) {
                        $('.scheme .scheme-item:eq('+i+')').remove();
                    }
                }
            }

            if (_this.parents('.scheme-item').index() >= 2 && _this.parents('.scheme-item').next('.scheme-item').length === 0) {
                $('.scheme').append('<div class="scheme-item"></div>');
            }

            // на всякий очищаем блок в котором будем отображать полученные данные
            _this.parents('.scheme-item').next('.scheme-item').empty();

            // здесь по аяксу запрашиваем данные для человека и внедряем в следующую колонку
            // для примера пока запихну статичные данные
            var departmentsListResponse = '<div class="departments-list">\n' +
                '                                <div class="scheme-block departments-block">\n' +
                '                                    <div class="department">Первый отдел</div>\n' +
                '                                </div>\n' +
                '                                <div class="scheme-block departments-block">\n' +
                '                                    <div class="department">Отдел организации мобилизационный подготовки и\n' +
                '                                        гражданской обороны\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                                <div class="scheme-block departments-block">\n' +
                '                                    <div class="department">Управление координации производственной деятельности\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                                <div class="scheme-block departments-block">\n' +
                '                                    <div class="department">Отедел маркетинга</div>\n' +
                '                                </div>\n' +
                '                            </div>';

            _this.parents('.scheme-item').next('.scheme-item').append(departmentsListResponse);

            // показываем полученные отделы
            _this.parents('.scheme-item').next('.scheme-item').find('.departments-list').addClass('show');

            // если кликнули по отделу
            if (_this.hasClass('departments-block')) {

                // запрашиваем людей из кликнутого отдела
                var peopleListresponse = '<div class="people-list">\n' +
                    '                                <div class="scheme-block person-block">\n' +
                    '                                    <div class="d-flex align-items-center">\n' +
                    '                                        <img src="img/portal/pic2.png" alt="">\n' +
                    '                                        <div>\n' +
                    '                                            <div class="name">Олег Дмитриевич Григорьев</div>\n' +
                    '                                            <div class="position">Первый заместитель директора</div>\n' +
                    '                                        </div>\n' +
                    '                                        <i class="toggle-contact ml-auto"></i>\n' +
                    '                                    </div>\n' +
                    '\n' +
                    '                                    <div class="more-info">\n' +
                    '                                        <div class="more-info-item">\n' +
                    '                                            <div class="gray-text">Email</div>\n' +
                    '                                            <a href="#">tnguk@genplanmos.ru</a>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="more-info-item">\n' +
                    '                                            <div class="gray-text">Телефон</div>\n' +
                    '                                            <div>414</div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="more-info-item">\n' +
                    '                                            <div class="gray-text">Кабинет</div>\n' +
                    '                                            <div>310</div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="more-info-item">\n' +
                    '                                            <div class="gray-text">Отдел</div>\n' +
                    '                                            <a href="#">Руководство</a>\n' +
                    '                                        </div>\n' +
                    '                                    </div>\n' +
                    '                                </div>\n' +
                    '\n' +
                    '                                <div class="scheme-block person-block">\n' +
                    '                                    <div class="d-flex align-items-center">\n' +
                    '                                        <img src="img/portal/pic3.png" alt="">\n' +
                    '                                        <div>\n' +
                    '                                            <div class="name">Константин Константинович Константинопольский\n' +
                    '                                            </div>\n' +
                    '                                            <div class="position">Директор института</div>\n' +
                    '                                        </div>\n' +
                    '                                        <i class="toggle-contact ml-auto"></i>\n' +
                    '                                    </div>\n' +
                    '\n' +
                    '                                    <div class="more-info">\n' +
                    '                                        <div class="more-info-item">\n' +
                    '                                            <div class="gray-text">Email</div>\n' +
                    '                                            <a href="#">tnguk@genplanmos.ru</a>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="more-info-item">\n' +
                    '                                            <div class="gray-text">Телефон</div>\n' +
                    '                                            <div>414</div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="more-info-item">\n' +
                    '                                            <div class="gray-text">Кабинет</div>\n' +
                    '                                            <div>310</div>\n' +
                    '                                        </div>\n' +
                    '                                        <div class="more-info-item">\n' +
                    '                                            <div class="gray-text">Отдел</div>\n' +
                    '                                            <a href="#">Руководство</a>\n' +
                    '                                        </div>\n' +
                    '                                    </div>\n' +
                    '                                </div>\n' +
                    '                            </div>';

                _this.parents('.departments-list').addClass('unselect');
                _this.parents('.scheme-item').find('.people-list').remove();
                _this.parents('.scheme-item').append(peopleListresponse);

                // показываем людей в кликнутом отделе
                _this.parents('.scheme-item').find('.people-list').addClass('show');
            }

            // перерисовываем полоски
            if (_this.parents('.scheme-item').index() > 0) {
                drawLines(_this, true, true);
            } else {
                drawLines(_this, false, true);
            }
        }
    });

    // добавление посетителя в заявках на пропуск


    $(document).on('click', '.add-user-link', function() {
        var
          clone = $('.visitor-link'), // копируем элемент на который мы кликнули
          count = $('.add-user-link').length; // определяем количество элементов .item
          $('.visitor-forms').append(clone.text(count + 1)); // добавляем элемент в конец элемента .items, при этом изменяем его содержимое на count + 1
    });

    $(document).on('click', '.add-visitor-link', function() {
        var formGroup = $(this).closest('.visitor-forms'),
            product = formGroup.clone(true, true);
        
        formGroup.after(product);
    });

    var new_id = 0;

    $(document).on('click', '.add-visitor-link', function() {
            if (new_id<=4) {
                var inputs = $('.new-visitors input[type="text"]');
                new_id = inputs.length+1;
                
                $('.new-visitors').append('<input type="text" class="form-control visitor-link new-visitor visitor-'+new_id+' mt-16" id="subject" placeholder="Иванов Иван Иванович"> <div class="remove-visitor d-block pt-16"><span  class="minus mr-8"></span>Удалить посетителя</div>');
            };
            return;
    });

    $(document).on('click', '.remove-visitor', function() {
            $('.new-visitor').last().remove();
            $('.remove-visitor').last().remove();
            new_id = 0;
        });
});
