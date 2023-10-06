import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



function _window() : any {
  // return the global native browser window object
  return window;
}
@Injectable({
  providedIn: 'root',
})
export class ApiService {


  get nativeWindow() : any {
    return _window();
 }


  // url = "http://159.89.164.11:3333/api/";
  url="http://139.59.73.87:3333/api/"
  localdata: any;
  httpOptions: any;
  filteredData: any = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  // Sets 'tabMy' in localStorage
  mymatches() {
    localStorage.setItem('tabMy', 'tab1');
  }

  // Navigates back in the browser history
  onBack() {
    window.history.go(-1);
  }

  // Sends a logout request
  logout(data: any) {
    return this.http.post(this.url + 'logout', data);
  }

  // Handles logout button click
  logoutbtn() {
    const token = localStorage.getItem('token');
    this.logout(token).subscribe({
      next: (res: any) => {
        localStorage.clear();
        this.toastr.success(res.message);
        window.location.reload();
      },
      error: (err: any) => {
        localStorage.clear();
        this.router.navigate(['/']);
      },
    });
  }

  // Retrieves the list of matches
  getMatchlist() {
    return this.http.get(this.url + 'getmatchlist');
  }

  // Retrieves the main banner
  getMainBanner() {
    return this.http.get(this.url + 'getmainbanner');
  }

  // Retrieves user full details
  userFullDetails() {
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.get(`${this.url}userFullDetails`);
  }

  // Edits user profile
  editprofile(data: any) {
    return this.http.post(this.url + 'editprofile', data);
  }

  // Retrieves user wallet details
  myWalletDetails() {
    return this.http.get(this.url + 'mywalletdetails');
  }

  // Retrieves user notifications
  getNotification() {
    return this.http.get(`${this.url}getnotification`);
  }

  // Retrieves user transaction history
  getTransaction() {
    return this.http.get(`${this.url}mytransactions`);
  }

  // Retrieves the version information
  getVersion() {
    return this.http.get(`${this.url}getVersion`);
  }

  // Retrieves the contests for a match
  getContest(matchkey: any) {
    return this.http.get(`${this.url}getAllNewContests?matchkey=${matchkey}`);
  }

  // Retrieves the details of a contest
  getContestDetails(id: any, matchkey: any) {
    return this.http.get(`${this.url}getContest?matchchallengeid=${id}&matchkey=${matchkey}`);
  }

  // Retrieves the leaderboard and live rank for a contest
  liveRankLeaderboard(matchkey: any, id: any, limit?: any, skip?: any) {
    limit = limit ?? '';
    skip = skip ?? '';
    return this.http.get(
      `${this.url}myleaderboard?matchchallengeid=${id}&matchkey=${matchkey}&limit=${limit}&skip=${skip}`
    );
  }

  // Retrieves all players for a match
  getAllPlayers(matchkey: any) {
    return this.http.get(`${this.url}getallplayers/${matchkey}`);
  }

  // Retrieves the user's teams for a match
  getMyTeams(matchkey: any) {
    return this.http.get(`${this.url}getMyTeams?matchkey=${matchkey}`);
  }

  // Retrieves the contests joined by the user for a match
  myJoinedContest(matchkey: any, limit?: any, skip?: any) {
    limit = limit ?? '';
    skip = skip ?? '';
    return this.http.get(`${this.url}myjoinedcontests?matchkey=${matchkey}&limit=${limit}&skip=${skip}`);
  }

  // Creates a new team for a match
  createTeam(data: any) {
    return this.http.post(this.url + '/createmyteam', data);
  }

  // Retrieves the available offers
  getOffers() {
    return this.http.get(`${this.url}getoffers`);
  }

  // Retrieves information about a player
  getPlayerInfo(pId: any, matchkey: any) {
    return this.http.get(
      `${this.url}getPlayerInfo?playerid=${pId}&matchkey=${matchkey}`
    );
  }

  // Retrieves the details of a team
  viewTeam(matchkey: any, teamid: any, teamnumber: any) {
    return this.http.get(
      `${this.url}viewteam?matchkey=${matchkey}&jointeamid=${teamid}&teamnumber=${teamnumber}`
    );
  }

  // Retrieves the usable balance for joining a contest
  getUsableBalance(challengeid: any, teamcount: any) {
    return this.http.get(
      `${this.url}getUsableBalance?matchchallengeid=${challengeid}&team_count=${teamcount}`
    );
  }

  // Joins a contest
  joinContest(data: any) {
    return this.http.post(this.url + 'joinContest', data);
  }

  // Switches teams for a contest
  switchTeams(data: any) {
    return this.http.post(`${this.url}switchteams`, data);
  }

  // Retrieves the newly joined matches
  newJoinedMatches() {
    return this.http.get(`${this.url}newjoinedmatches`);
  }

  // Retrieves the live matches
  liveMatches() {
    return this.http.get(`${this.url}livematches`);
  }

  // Retrieves all completed matches
  allCompletedMatches() {
    return this.http.get(`${this.url}all-completed-matches`);
  }

  // Verifies the user's email
  verifyEmail(data: any) {
    return this.http.post(`${this.url}verifyEmail`, data);
  }

  // Verifies the user's mobile number
  verifyMobileNumber(data: any) {
    return this.http.post(`${this.url}verifyMobileNumber`, data);
  }

  // Verifies the user's code
  verifyCode(data: any) {
    return this.http.post(`${this.url}verifyCode`, data);
  }

  // Retrieves the user's referral list
  referList() {
    return this.http.get(`${this.url}user-refer-list`);
  }

  // Retrieves the fantasy scorecards for a player in a match
  matchPlayerFantasy(pId: any, matchkey: any) {
    return this.http.get(
      `${this.url}matchplayerfantasyscorecards?playerid=${pId}&matchkey=${matchkey}`
    );
  }

  // Retrieves live scores for a match
  getlivescores(matchkey: any) {
    return this.http.get(`${this.url}getlivescores?matchkey=${matchkey}`);
  }

  // Retrieves live ranks leaderboard for a contest in a match
  liveRanksLeaderboard2(matchkey: any, matchchallengeid: any, limit: any, skip: any) {
    return this.http.get(
      `${this.url}liveRanksLeaderboard?matchkey=${matchkey}&matchchallengeid=${matchchallengeid}&limit=${limit}&skip=${skip}`
    );
  }

  // Retrieves live scores for a match
  matchlivescore(matchkey: any) {
    return this.http.get(`${this.url}matchlivescore?matchkey=${matchkey}`);
  }

  // Retrieves the playing status for players in a match
  PlayingStatus(matchkey: any) {
    return this.http.get(
      `${this.url}getAllPlayersWith_PlayingStatus/${matchkey}`
    );
  }

  // Changes the user's password
  changePassword(data: any) {
    return this.http.post(`${this.url}changepassword`, data);
  }

  // Uploads user's image
  imageUpload(img: any) {
    return this.http.post(`${this.url}imageUploadUser`, img);
  }

  // Retrieves PAN card details
  getPanDetails() {
    return this.http.get(`${this.url}getpandetails`);
  }

  // Retrieves Aadhaar card details
  getAadhaarDetails() {
    return this.http.get(`${this.url}getaadharDetails`);
  }

  // Uploads PAN card image
  panUpload(data: any) {
    return this.http.post(`${this.url}panrequest`, data);
  }

  // Uploads Aadhaar card image
  aadhaarUpload(data: any) {
    return this.http.post(`${this.url}aadhar_card_request`, data);
  }

  // Uploads bank details
  bankUpload(data: any) {
    return this.http.post(`${this.url}bankrequest`, data);
  }

  // Retrieves bank details
  getBankDetails() {
    return this.http.get(`${this.url}getbankdetails`);
  }

  // Creates a private contest
  privateContest(data: any) {
    return this.http.post(`${this.url}create-private-contest`, data);
  }

  // Joins a contest by code
  joinByCode(data: any) {
    return this.http.post(`${this.url}joinContestByCode`, data);
  }

  // Retrieves all series
  getAllSeries() {
    return this.http.get(`${this.url}getallseries`);
  }

  // Retrieves the leaderboard for a contest
  getLeaderboard(id: any) {
    return this.http.get(`${this.url}getleaderboard/${id}`);
  }

  // Requests to add cash
  requestAddCash(data: any) {
    return this.http.post(`${this.url}requestaddcash`, data);
  }

  // Makes a phonepay API request
  phonepay(data: any) {
    return this.http.post(this.url + 'phonepayapi', data);
  }

  // Makes a withdraw request
  withdraw(data: any) {
    return this.http.post(this.url + 'requestwithdraw', data);
  }

  // Makes a phonepay API request with base64 encoding
  phonepayapi(data: any) {
    return this.http.post(`${this.url}phonepayapiwithbase64`, data);
  }

  // Retrieves all verification details
  allVerify() {
    return this.http.get(`${this.url}allverify`);
  }
  termsConditions() {
    return this.http.get(`${this.url}termsConditions`);
  }
   rulesRegulation() {
    return this.http.get(`${this.url}rulesregulation`);
  }
  userList() {
    return this.http.get(`${this.url}/chat/getUsers`);
  }
  joinGroups() {
    return this.http.get(`${this.url}/chat/joinGroups`);
  }
  request() {
    return this.http.get(`${this.url}/chat/request`);
  }
  createGroup(data: any) {
    return this.http.post(`${this.url}/chat/createGroup`, data);
  }
  userRequestAction(data: any) {
    return this.http.post(`${this.url}/chat/userRequestAction`, data);
  }
  AddParticipants(data: any) {
    return this.http.post(`${this.url}/chat/AddParticipants`, data);
  }

  removeParticipants(groupId: any, userId: any) {
    return this.http.delete(`${this.url}/chat/removeParticipants/${groupId}/${userId}`);
  }
  removeAdmin(groupId: any, userId: any) {
    return this.http.delete(`${this.url}/chat/removeAdmin/${groupId}/${userId}`);
  }
 exitGroup(groupId: any) {
    return this.http.delete(`${this.url}/chat/removeSelf/${groupId}`);
  }

  makeAdmin(data: any) {
    return this.http.post(`${this.url}/chat/makeAdmin`, data);
  }
  shareLink(data: any) {
    return this.http.post(`${this.url}/chat/shareLink`, data);
  }
}
