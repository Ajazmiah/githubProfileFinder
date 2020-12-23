let input = document.getElementById('search');
let profile = document.getElementById('profile');
let btn = document.getElementById('btn');
let repos = document.getElementById('repos');

	//call search function when enter key is pressed
	input.addEventListener('keypress', (event)=> {

		clear();
		checkEnter(event);

});


	function clear(){

		repos.innerHTML = "";
	}

	//call search function when button is cliked
	btn.addEventListener('click', ()=> search());

		clear();

	let search = ()=>{

		let username = input.value;

		if(checkEnter){

		 getUsers(username).then(user => printUsers(user));

		  getRepos(username).then(repo => printRepos(repo));


		}

		repos.scrollIntoView({behavior:"smooth",block: "end"});
	}

function checkEnter(event){

	if(event.keyCode === 13){

			event.preventDefault();

			search(event);

		return true;
	}else {

		return false;
	}


}


function validate(value){

	if (value === "" || value === null) {


		return false;
	}else return true;

}




function printUsers(data){

		if (data.bio == null || data.bio ==="") {

			data.bio = " User did not provide any bio";

		}else{data.bio = data.bio}

		profile.innerHTML =`

			<div id="imgDiv">
				<img src=${data.avatar_url} id ="userImg">
			</div>

			<div id="userInfo">
				<div id="userInfo-Content">
					<h3 id="Username">${data.login}</h3>
					<h1 id="location">${data.location}</h1>
					<p id="bio">${data.bio}</p>

					<br/>

					<ul id="activities">
						<li> FOLLOWERS:${data.followers}<li/>
						<li> FOLLWING :${data.following}<li/>
						<li>PUBLIC REPOS:${data.public_repos}<li
						<li>PUBLIC GISTS:${data.public_gists}<li/>
					</ul>

					<a id="link" href="${data.html_url}">visit profile</a>
				</div>
			</div>`;
		}



function printRepos(Repos){

	Repos.forEach(( repo)=>{

		repos.innerHTML += `


		<ul class="repo_lists">
			<li id="repo-name"><h3>${repo.name}</h3></li>
			<div id="small-fonts">
				<li>FORKS: ${repo.forks_count}<li/>
				<li> WATCHERS: ${repo.watchers_count}<li/>
				<li>STAR: ${repo.stargazer_count}<li/>
			<div/>
			<li> <a href= "${repo.html_url}" id="repo-btn">Visit Repo</a><li/>
		<ul/>

		`;
	});

	profile.scrollIntoView({behavior:"smooth",block: "center"});

}


async function getUsers(username){

	profile.style.display ="flex";


	try{

		const results = await fetch(`https://api.github.com/users/${username}?client_id=375900a55181cd243d75&client_secret=10e303b64ad036d9c045e4096714ace512fd6518`)
		return await results.json();

	}
	catch(error){

		console.log("THE USER YOU ENTERED DOES NOT EXIST");
	}
}


async function getRepos(username){

	try{
		const results = await  fetch(`https://api.github.com/users/${username}/repos?client_id=375900a55181cd243d75&client_secret=10e303b64ad036d9c045e4096714ace512fd6518`)
		return await results.json();
	}
	catch(error){

		console.log(error);
	}


}
