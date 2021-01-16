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
<body>
  <div class = "top-wrapper container">
    <a href = "../php.html">戻る</a>
    <h1 class = "top-title">football betting game</h1>
    <form method = "post" action = "result.php">
      <div class = "team-items">
        <?php foreach ($teams as $team): ?>
          <div class = "team-item">
            <img src ="<?php echo $team->get_Image(); ?>" class = "team_image">
            <h2 class ="team_name"><?php echo $team->get_Name(); ?></h2>
            <p class ="odds">オッズ:<?php echo $team->get_Odds(); ?></p>
            <input type = "text" value = "0" name = "<?php echo $team->get_Name(); ?>">
            <span>円 賭ける</span>
          </div>
        <?php endforeach; ?>
      </div>
      <div class = "submit">
        <input type = "submit" value = "bet">
      </div>
    </form>
  </div>
</body>
</hmtl>
