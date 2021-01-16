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
          question : 'easyfighter/f86D.jpg',
          answer : ['F-86D', 'フィアットG.91', 'F-8', 'F-86F']
      }
      ,{
          question : 'easyfighter/mig21.jpg',
          answer : ['MiG-21', 'F-4', 'MiG-17', 'J-35']
      }
      ,{
          question : 'easyfighter/b2.jpg',
          answer : ['B-2', 'Ho229', 'B-21', 'B-49']
      }
      ,{
          question : 'easyfighter/b29.jpg',
          answer : ['B-29', 'Tu-4', 'B-52', '富嶽']
      }
      ,{
          question : 'easyfighter/b52.jpg',
          answer : ['B-52', 'ミラージュⅣ', 'Tu-95', '富嶽']
      }
      ,{
          question : 'easyfighter/rafale.jpg',
          answer : ['ラファール', 'MiG-35', 'F-16', 'ミラージュ2000']
      }
      ,{
          question : 'easyfighter/ユーロファイター.jpg',
          answer : ['ユーロファイター', 'ラファール', 'J-10', 'F-15']
      }
      ,{
          question : 'easyfighter/JAS39.jpg',
          answer : ['JAS39', 'JAS35', 'ラファール', 'Su-35']
      }
      ,{
          question : 'easyfighter/ハリアーGR.3.jpg',
          answer : ['ハリアーGR.3', 'F-35', 'Yak-38', 'ミラージュⅢ']
      }
      ,{
          question : 'easyfighter/F-104.jpg',
          answer : ['F-104', 'F-102', 'F-106', 'F-105']
      }
      ,{
          question : 'easyfighter/MiG-25.jpg',
          answer : ['MiG-25', 'Su-17', 'J-8', 'F-1']
      }
      ,{
          question : 'easyfighter/MU-2.jpg',
          answer : ['MU-2', 'V-107', 'UH-47', 'US-2']
      }
      ,{
          question : 'easyfighter/Tu-95.jpg',
          answer : ['Tu-95', 'Tu-4', 'H-6', 'B-1']
      }
      ,{
          question : 'easyfighter/f86.jpg',
          answer : ['F-86', 'MiG-15', 'ミステールⅣ', 'F-100']
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
