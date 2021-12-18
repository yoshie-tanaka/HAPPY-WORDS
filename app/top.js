// -----------ハンバーガー--------------

$(function() {
    $('.toggle_btn').click(function() {
        $(this).toggleClass('open_btn'); //クリックした時.toggle_btnにopenクラスがなければつける
  
        //.toggle_btnにopenがついてたら、.hambergerにもopenをつける。ついていなかったらopenを削除する
        if ($(this).hasClass('open_btn')) {
            $('.hamberger').addClass('open');
            $('#mask').addClass('open');
        } else {
            $('.hamberger').removeClass('open');
            $('#mask').removeClass('open');
        }
    });
  
    //.hambergerがクリックされたら削除する
    $('.open_btn').click(function() {
        $(this).toggleClass('open_btn');
        $('.hamberger').toggleClass('open');
    });
  }); 










//---------------テキストアニメーション-----------------//
const animationTagetElements = document.querySelectorAll(".textAnimation");
console.log(animationTagetElements);

// textsは、targetElementからテキストを抽出する

for (let i = 0; i < animationTagetElements.length; i++) {
    const targetElement = animationTagetElements[i],
    texts = targetElement.textContent,
    textsArray = [];
    targetElement.textContent = ""; //一度中身を消す
 
    
    console.log(textsArray);

    for(let j = 0; j < texts.split("").length; j++){
        const t = texts.split("")[j];
        //取得した文字列tが空白だったら空白を返す
        if (t === "　"){
            textsArray.push("　");
        } else {
            // 0.2秒後に次の文字が表示される
        textsArray.push('<span><span style="animation-delay: '+ (j * .2) +'s;">' + t + '</span></span>')
        }
    }

    for( let k = 0; k <textsArray.length; k++) {
        targetElement.innerHTML += textsArray[k]
    }
}



