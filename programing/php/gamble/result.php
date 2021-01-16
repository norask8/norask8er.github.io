<?php
  require_once('data.php');
  ?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>football betting game</title>
  <link rel="stylesheet" type="text/css" href="gamble.css">
  <link href='https://fonts.googleapis.com/css?family=Pacifico|Lato' rel='stylesheet' type='text/css'>
</head>
<boby>
  <div class = "top-wrapper container">
    <a href = "gamble.php">戻る</a>
    <h1 class = "top-title">football betting game</h1>
  </div>
  <div class = "contents">
    <p>試合結果</p>
    <?php foreach ($teams as $team): ?>
      <?php
        $betprice = $_POST[$team->get_Name()];
        $team->set_Betprice($betprice);
        $kari_totalPrice += $team->get_total_price();
        $total_betprice += $team->get_Betprice();
      ?>
      <h3><?php echo $team->get_Result(); ?></h3>
      <h4>あなたは<?php echo $team->get_Betprice();?>円賭けて<?php echo $team->get_total_price(); ?>円を獲得しました。</h4>
    <?php endforeach; ?>
    <?php $total_price = $kari_totalPrice - $total_betprice; ?>
    <h5>合計獲得金額: <?php echo $kari_totalPrice ?>円</h5>
    <h5>合計賭け金:<?php echo $total_betprice?>円</h5>
    <h5>利益:<?php echo $total_price ?>円</h5>
</body>
</html>
