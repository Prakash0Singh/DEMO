import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
{ path: '', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
{ path: 'home', title:"Home",  loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
{ path: 'myMatches',  title:"MyMatches",  loadChildren: () => import('./components/my-matches/my-matches.module').then(m => m.MyMatchesModule) },
{ path: 'profile',   title:"Profile", loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule) },
{ path: 'wallet',  title:"Wallet",  loadChildren: () => import('./components/wallet/wallet.module').then(m => m.WalletModule) },
{ path: 'more',  title:"More",  loadChildren: () => import('./components/more/more.module').then(m => m.MoreModule) },
{ path: 'invite',  title:"Invite",  loadChildren: () => import('./components/invite/invite.module').then(m => m.InviteModule) },
{ path: 'add-cash', title:"Addcash",  loadChildren: () => import('./components/add-cash/add-cash.module').then(m => m.AddCashModule) },
{ path: 'info-setting',  title:"Infosetting",  loadChildren: () => import('./components/info-setting/info-setting.module').then(m => m.InfoSettingModule) },
{ path: 'point-system',  title:"Pointsystem",  loadChildren: () => import('./components/point-system/point-system.module').then(m => m.PointSystemModule) },
{ path: 'kyc',   title:"Kyc",  loadChildren: () => import('./components/kyc/kyc.module').then(m => m.KycModule) },
{ path: 'over-fantasy-points',  title:"Overfantasypoints",   loadChildren: () => import('./components/over-fantasy-points/over-fantasy-points.module').then(m => m.OverFantasyPointsModule) },
{ path: 'notification',  title:"Notification",  loadChildren: () => import('./components/notification/notification.module').then(m => m.NotificationModule) },
{ path: 'transaction',  title:"Transaction",  loadChildren: () => import('./components/transaction/transaction.module').then(m => m.TransactionModule) },
{ path: 'upcoming-contest',  title:"Upcomingcontest",  loadChildren: () => import('./components/upcoming-contest/upcoming-contest.module').then(m => m.UpcomingContestModule) },
{ path: 'contest-details', title:"Contestdetails",  loadChildren: () => import('./components/contest-details/contest-details.module').then(m => m.ContestDetailsModule) },
{ path: 'create-contest', title:"Createcontest",  loadChildren: () => import('./components/private-league/private-league.module').then(m => m.PrivateLeagueModule) },
{ path: 'create-team', title:"Createteam",  loadChildren: () => import('./components/create-team/create-team.module').then(m => m.CreateTeamModule) },
{ path: 'filtered-contest', title:"Filteredcontest",  loadChildren: () => import('./components/filtered-contest/filtered-contest.module').then(m => m.FilteredContestModule) },
{ path: 'select-captain', title:"Selectcaptain",  loadChildren: () => import('./components/select-captain/select-captain.module').then(m => m.SelectCaptainModule) },
{ path: 'team-view', title:"Teamview",  loadChildren: () => import('./components/team-view/team-view.module').then(m => m.TeamViewModule) },
{ path: 'player-info', title:"Playerinfo",  loadChildren: () => import('./components/player-info/player-info.module').then(m => m.PlayerInfoModule) },
{ path: 'choose-team', title:"Chooseteam",  loadChildren: () => import('./components/choose-team/choose-team.module').then(m => m.ChooseTeamModule) },
{ path: 'joined-contest-details', title:"Joinedcontestdetails",  loadChildren: () => import('./components/joined-contest-details/joined-contest-details.module').then(m => m.JoinedContestDetailsModule) },
{ path: 'my-matches/contest', title:"Contest",  loadChildren: () => import('./components/live-contest-details/live-contest-details.module').then(m => m.LiveContestDetailsModule) },
{ path: 'my-matches/contest-details', title:"Contestdetails",  loadChildren: () => import('./components/completed-contest-details/completed-contest-details.module').then(m => m.CompletedContestDetailsModule) },
{ path: 'change-password',  title:"Changepassword",  loadChildren: () => import('./components/change-password/change-password.module').then(m => m.ChangePasswordModule) }, { path: 'players_Info', loadChildren: () => import('./components/players-info/players-info.module').then(m => m.PlayersInfoModule) },
{ path: 'leaderboard',  title:"Leaderboard",  loadChildren: () => import('./components/leaderboard/leaderboard.module').then(m => m.LeaderboardModule) },
{ path: 'withdraw', title:"Withdraw",  loadChildren: () => import('./components/withdraw/withdraw.module').then(m => m.WithdrawModule) },
{ path: 'chat', title:"chat", loadChildren: () => import('./components/chat/chat.module').then(m => m.ChatModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
