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
      },
      error: function() {
        // エラーが発生時に表示するメッセージ
        $('#c-user__info').html('<p>エラーが発生しました</p>');
      }
    });
  });
});
