$(function(){
    var quizArea = $('.quiz_area'); //クイズを管理するDOMを指定
    var quiz_html = quizArea.html(); //もう一度　を押した時に元に戻すため初期HTMLを変数で保管
    var quiz_cnt = 0; //現在の問題数を管理
    var quiz_fin_cnt = 10; //何問で終了か設定（クイズ数以下であること）
    var quiz_success_cnt = 0; //問題の正解数

    //クイズの配列を設定
    //answerの選択肢の数はいくつでもOK　ただし先頭を正解とすること(出題時に選択肢はシャッフルされる)
    var aryQuiz = [];
    aryQuiz.push(
      {
          question : 'rikujou/ah-64d.jpg',
          answer : ['AH-64D', 'AH-1', 'AH-56', 'AH-1S']
      }
      ,{
          question : 'rikujou/ah-1s.jpg',
          answer : ['AH-1S', 'H-13', 'CH-47', 'AH-56']
      }
      ,{
          question : 'rikujou/ch-47.jpg',
          answer : ['CH-47', 'YHC-1B', 'KV-107Ⅱ', 'UH-60']
      }
      ,{
          question : 'rikujou/uh-60ja.jpg',
          answer : ['UH-60JA', 'UH-1J', 'LR-1', 'LV-107Ⅱ']
      }
      ,{
          question : 'rikujou/uh-1.jpg',
          answer : ['UH-1', 'C-124', 'UH-60', 'AH-1S']
      }
      ,{
          question : 'rikujou/oh-1.jpg',
          answer : ['OH-1', 'OH-6D', 'MH2000', 'H-13']
      }
      ,{
          question : 'rikujou/oh-6d.jpg',
          answer : ['OH-6D', 'H-13', 'H-23', 'OH-58']
      }
      ,{
          question : 'rikujou/ec225lp.jpg',
          answer : ['EC-225LP', 'AS332', 'EC725', 'TH-480B']
      }
      ,{
          question : 'rikujou/th480b.jpg',
          answer : ['TH-480B', 'MD500E', 'シュワイザー333M', 'F-28']
      }
      ,{
          question : 'rikujou/lr-1.jpg',
          answer : ['LR-1', 'LR-2', 'V-44A', 'L-19']
      }
      ,{
          question : 'rikujou/lr-2.jpg',
          answer : ['LR-2', 'LR-1', 'LM-2', 'TL-1']
      }
    );

    quizReset();

    //回答を選択した後の処理
    quizArea.on('click', '.quiz_ans_area ul li', function(){
        //画面を暗くするボックスを表示（上から重ねて、結果表示中は選択肢のクリックやタップを封じる
        quizArea.find('.quiz_area_bg').show();
        //選択した回答に色を付ける
        $(this).addClass('selected');
        if($(this).data('true')){
            //正解の処理 〇を表示
            quizArea.find('.quiz_area_icon').addClass('true');
            //正解数をカウント
            quiz_success_cnt++;
        }else{
            //不正解の処理
            quizArea.find('.quiz_area_icon').addClass('false');
        }
        setTimeout(function(){
            //表示を元に戻す
            quizArea.find('.quiz_ans_area ul li').removeClass('selected');
            quizArea.find('.quiz_area_icon').removeClass('true false');
            quizArea.find('.quiz_area_bg').hide();
            //問題のカウントを進める
            quiz_cnt++;
            if(quiz_fin_cnt > quiz_cnt){
                //次の問題を設定する
                quizShow();
            }else{
                //結果表示画面を表示
                quizResult();
            }
        }, 1500);
    });

    //もう一度挑戦するを押した時の処理
    quizArea.on('click', '.quiz_restart', function(){
        quizReset();
    });

    //リセットを行う関数
    function quizReset(){
        quizArea.html(quiz_html); //表示を元に戻す
        quiz_cnt = 0;
        quiz_success_cnt = 0;
        aryQuiz = arrShuffle(aryQuiz); //毎回出題の順番をシャッフルしたい場合はここのコメントを消してね
        quizShow();
    }

    //問題を表示する関数
    function quizShow(){
        //何問目かを表示
        quizArea.find('.quiz_no').text((quiz_cnt + 1));
        //問題文を表示
        quizArea.find('img').attr('src',aryQuiz[quiz_cnt]['question']);
        //正解の回答を取得する
        var success = aryQuiz[quiz_cnt]['answer'][0];
        //現在の選択肢表示を削除する
        quizArea.find('.quiz_ans_area ul').empty();
        //問題文の選択肢をシャッフルさせる(自作関数) .concat()は参照渡し対策
        var aryHoge = arrShuffle(aryQuiz[quiz_cnt]['answer'].concat());
        //問題文の配列を繰り返し表示する
        $.each(aryHoge, function(key, value){
            var fuga = '<li>' + value + '</li>';
            //正解の場合はdata属性を付与する
            if(success === value){
                fuga = '<li data-true="1">' + value + '</li>';
            }
            quizArea.find('.quiz_ans_area ul').append(fuga);
        });
    }

    //結果を表示する関数
    function quizResult(){
        quizArea.find('.quiz_set').hide();
        var text = quiz_fin_cnt + '問中' + quiz_success_cnt + '問正解！';
        if(quiz_fin_cnt === quiz_success_cnt){
            text += '<br>全問正解おめでとう！';
        }
        text += '<br><input type="button" value="もう一度挑戦する" class="quiz_restart p-10">';
        quizArea.find('.quiz_result').html(text);
        quizArea.find('.quiz_result').show();
    }

    //配列をシャッフルする関数
    function arrShuffle(arr){
        for(i = arr.length - 1; i > 0; i--){
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
        return arr;
    }
});
