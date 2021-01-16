<?php
require_once('team.php');

$real = new Team('RealMadrid','football/real.jpg',$real_odds,$real_result);
$atle = new Team('AtleticoMadrid','football/atle.jpg',$atle_odds,$atle_result);
$leicester = new Team('Leicester','football/leicester.jpg',$leicester_odds,$leicester_result);
$mainz = new Team('Mainz','football/mainz.jpg',$mainz_odds,$mainz_result);

$teams = array($real,$atle,$leicester,$mainz);

#echo $atle->get_Name();
#echo $real->get_Image();
#echo $real->get_Odds();
#echo $mainz->get_Result();

?>
