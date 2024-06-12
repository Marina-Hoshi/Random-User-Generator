$(document).ready(function() {
  $('#c-generate__btn').click(function() {
    $.ajax({
      url: 'https://randomuser.me/api/',
      dataType: 'json',
      success: function(data) {
        // ユーザー情報を取得
        const user = data.results[0];
        // ユーザー情報をHTMLに表示
        $('#c-user__info').html(`
          <img src="${user.picture.large}" alt="顔写真">
          <p><strong>Name:</strong> ${user.name.first} ${user.name.last}</p>
          <p><strong>Gender:</strong> ${user.gender}</p>
          <p><strong>Age:</strong> ${user.dob.age}</p>
          <p><strong>Username:</strong> ${user.login.username}</p>
          <p><strong>Address:</strong> ${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Phone:</strong> ${user.phone}</p>
          <p><strong>Cell:</strong> ${user.cell}</p>
          <p><strong>Nationality:</strong> ${user.nat}</p>
        `);

        // 年齢に基づいてレコメンド画像を取得し、コンソールに出力
        const recommendationImage = getRecommendationImage(user.dob.age);
        console.log("Recommendation Image URL:", recommendationImage);
      },

      error: function() {
        // エラーが発生時に表示するメッセージ
        $('#c-user__info').html('<p>エラーが発生しました</p>');
      }
    });
  });
});

// 年齢に基づいてレコメンド画像を選択する関数
function getRecommendationImage(age) {
  // 年齢別のレコメンド画像の配列を定義
  const recommendations = [
    { ageRange: [20, 29], image: 'img/cookie.JPG' },
    { ageRange: [30, 39], image: '' },
    { ageRange: [40, 49], image: '' },
    { ageRange: [50, 59], image: '' },
    { ageRange: [60, 69], image: '' },
    { ageRange: [70, 80], image: '' }
  ];

  // デバッグ：適切なレコメンド画像を選択しているかを確認する
  console.log("Age:", age);
  const recommendation = recommendations.find(rec => {
    const inRange = age >= rec.ageRange[0] && age <= rec.ageRange[1];
    console.log("Age Range:", rec.ageRange, "In Range:", inRange);
    return inRange;
  });

  return recommendation ? recommendation.image : '';
}