window.onload = function () {
  const loggedInUser = localStorage.getItem('loggedInUser');

  if (loggedInUser !== 'admin@quiz.com') {
      alert('Access denied. Admins only.');
      window.location.href = 'index.html';
      return;
  }

  const userListContainer = document.getElementById('userList');
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userScores = JSON.parse(localStorage.getItem('userScores')) || {};

  if (users.length === 0) {
      userListContainer.innerHTML = '<p>No registered users found.</p>';
      return;
  }

  const table = document.createElement('table');
  table.innerHTML = `
      <tr>
          <th>Email</th>
          <th>Scores</th>
      </tr>
  `;

  users.forEach(user => {
      const email = user.email;
      const scores = userScores[email] || [];

      const scoreDetails = scores.length > 0
          ? scores.map(score => `Quiz: ${score.quizTitle}, Score: ${score.score}`).join('<br>')
          : 'No quizzes taken yet';

      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${email}</td>
          <td>${scoreDetails}</td>
      `;
      table.appendChild(row);
  });

  userListContainer.appendChild(table);
};
