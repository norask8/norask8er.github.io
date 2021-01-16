<?php
  #header('Content-type: image/jpg');
  class Team{
    private $name;
    private $image;
    private $odds;
    private $result;
    private $betprice = 0;

    public function __construct($name,$image,$odds,$result) {
      $this->name = $name;
      $this->image = $image;#この辺忘れて苦労した
      $this->odds = $odds;
      $this->result = $result;
    }
    public function hello(){
      echo '私は'.$this->name."です\n";
    }
    public function get_Name(){
      return $this->name;
    }
    public function get_Image(){
      return $this->image;
    }
    public function get_Betprice(){
      return $this->betprice;
    }
    public function set_Betprice($betprice){#これやらんと入力値ゲットできない
      $this->betprice = $betprice;
    }
    public function get_Odds(){
      return $this->odds;
    }
    public function get_Result(){
      if($this->result == 1){
        return $this->name."はCLで優勝しました\n";
      }elseif($this->result == 0){
        return $this->name."は優勝できませんでした\n";
      }
    }
    public function get_total_price(){
      return floor($this->betprice * $this->odds * $this->result);#メソッドは一個一個確認しろ！！！
    }
  }
  $real_odds = 1.5 + mt_rand() / mt_getrandmax() * (2.4 - 1.5);
  $atle_odds = 2.0 + mt_rand() / mt_getrandmax() * (4.0 - 2.0);
  $leicester_odds = 5.0 + mt_rand() / mt_getrandmax() * (8.0 - 5.0);
  $mainz_odds = 15 + mt_rand() / mt_getrandmax() * (25 - 15);


  $random = mt_rand() / mt_getrandmax();
  if($random <= 0.45){#レアルの勝率45％
    $real_result = 1;
    $atle_result = 0;
    $leicester_result = 0;
    $mainz_result= 0;
  }elseif($random <= 0.8 && $random > 0.45){#アトレティコの勝率35％
    $real_result = 0;
    $atle_result = 1;
    $leicester_result = 0;
    $mainz_result= 0;
  }elseif($random <= 0.95 && $random >0.8){#レスターの勝率15％
    $real_result = 0;
    $atle_result = 0;
    $leicester_result = 1;
    $mainz_result= 0;
  }else{#マインツの勝率5%
    $real_result = 0;
    $atle_result = 0;
    $leicester_result = 0;
    $mainz_result= 1;
  }
  #echo $random."\n";
  #echo $real_result."\n";
  #echo $atle_result."\n";
  #echo $leicester_result."\n";
  #echo $mainz_result."\n";

  #$real = new Team('レアル・マドリード','football/real.jpg',$real_odds,$real_result);
  #$atle = new Team('アトレティコ','football/atle.jpg',$atle_odds,$atle_result);
  #$leicester = new Team('レスター','football/leicester.jpg',$leicester_odds,$leicester_result);
  #$mainz = new Team('マインツ','football/mainz.jpg',$mainz_odds,$mainz_result);
  #$teams = array($real,$atle,$leicester,$mainz);

  #$real->hello();
  #echo $atle->get_Name();
 ?>
