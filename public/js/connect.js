
    window.addEventListener('load', (event) => {
        console.log('page is fully loaded');
        document.getElementById("matter-2").style.display = "none"
        document.getElementById("matter-3").style.display = "none"
        document.getElementById("matter-4").style.display = "none"

            
    // https://stackoverflow.com/questions/35386064/jquery-editing-one-row-at-a-time

    $('#product-table').find('.save, .cancel').hide();
    $('#product-table').on('click', '.edit', function() {
        $('#product-table').find('.save, .cancel').hide();
        $('#product-table').find('.edit').show();
        $('*').prop('contenteditable', false)
        $(this).hide().siblings('.save, .cancel').show();
        currentTD = $(this).closest('td').siblings()
        $.each(currentTD, function () {
                $(this).attr("initialval", $(this).text())
            $(this).prop('contenteditable', true)
        });
    });

    $('#save').on('click', function() {
        var $btn = $(this);
        $('#product-table').find('.save, .cancel').hide();
        $btn.hide().siblings('.edit').show();
        currentTD = $(this).closest('td').siblings();
        $.each(currentTD, function () {
            $(this).prop('contenteditable', false)
        });
        var data = {'bob':'foo','paul':'dog'};
        $.ajax({
            url: '/updateProduct',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function(data) {
                console.log('form submitted');
            }
          });
    });
    });

    $('#product-table').on('click', '.cancel', function() {
        var $btn = $(this);
        $('#product-table').find('.save, .cancel').hide();
        $btn.hide().siblings('.edit').show();
        currentTD = $(this).closest('td').siblings()
        $.each(currentTD, function () {        
            $(this).text($(this).attr("initialval"));
            $(this).prop('contenteditable', false)
        });
    });


function toggleMenu() {
    let toggle = document.querySelector('.connect-toggle');
    let navigation = document.querySelector('.connect-navigation');
    let main = document.querySelector('.connect-main');
    toggle.classList.toggle('active');
    navigation.classList.toggle('active');
    main.classList.toggle('active');
};


function get_option(obj) {
    var temp = "none";
    for (var i = 1; i < 5; i++) {
        if (i == obj)
            temp = "block";
        else
            temp = "none";
        document.getElementById("matter-" + i).style.display = temp;
    }
}

