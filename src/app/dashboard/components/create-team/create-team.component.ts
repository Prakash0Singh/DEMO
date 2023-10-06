import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PlayersInfoComponent } from '../players-info/players-info.component';
import { PlatformLocation } from '@angular/common'
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { AppLoaderService } from '../app-loader/app-loader.service';
@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit, OnDestroy {
  userInfo: any = []
  disable: boolean = false

  onBack() {
    window.history.go(-1)
    localStorage.removeItem('team')
  }
  matchKey: any;
  allPlayers: any = [];
  keeper: any = [];
  bats: any = [];
  bowler: any = [];
  allRound: any = []
  upcoming: any = []
  match: any = [];
  myDate: any = new Date();
  timeStart: any;
  finalDate: any;
  wk: any = [];
  ar: any = [];
  bow: any = [];
  bat: any = [];
  localData: any = [];
  final_players: any = [];
  creditLimit: any = 100;
  team1_player: any = [];
  team2_player: any = [];
  total_players: any = [];
  select = false
  bowlBool: boolean = false
  arBool: boolean = false
  batBool: boolean = false
  wkBool: boolean = false
  team1Bool: boolean = false
  team2Bool: boolean = false
  progressBar: any = [
    { Select: false },
    { Select: false },
    { Select: false },
    { Select: false },
    { Select: false },
    { Select: false },
    { Select: false },
    { Select: false },
    { Select: false },
    { Select: false },
    { Select: false },
  ]
  teamId: any;
  teamNumber: any;
  editTeamArray: any = [];
  edit: any;
  challengeId: any;
  ordertype: any;
  ordertype2: any;
  ordertype3: any;
  ordertype4: any;
  imgType = false;
  imgType2 = false;
  imgPoint1 = false;
  imgPoint2 = false;
  imgPoint3 = false;
  imgPoint4 = false;
  imgcredit1 = false;
  imgcredit2 = false;
  imgcredit3 = false;
  imgcredit4 = false;
  playerMatchesInfo: any = []
  playerInfos: any = []

  constructor(private changeDetectorRef: ChangeDetectorRef,
    private _location: Location, location: PlatformLocation, private route: ActivatedRoute, public api: ApiService, private datePipe: DatePipe, private toastr: ToastrService, private router: Router, public dialog: MatDialog, private loader: AppLoaderService) {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd H:mm:ss');
    this.myDate = Date.parse(this.myDate)
    console.log(this.myDate, 'DATE');
  }

  private unsubscriber: Subject<void> = new Subject<void>();      //  browser back navigation event
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params, "PARAMS");
      if (params['edit'] || params['teamId']) {
        this.matchKey = atob(params['matchkey'])
        this.teamId = atob(params['teamId'])
        this.teamNumber = atob(params['teamNumber'])
        this.edit = (params['edit'])
        console.log(this.matchKey, "MATCH KEY");
        console.log(this.teamId, "teamId");
        console.log(this.teamNumber, "teamNumber");
      }
      if (params['matchkey']) {
        this.matchKey = atob(params['matchkey'])
        // this.challengeId = atob(params['challengeid'])
        console.log(this.matchKey, "MATCH KEY");
      }
      if (params['challengeid']) {
        // this.matchKey = atob(params['matchkey']);
        this.challengeId = atob(params['challengeid'])
        console.log(this.challengeId, "Challenge ID");
      }

    })


    this.api.userFullDetails().subscribe((res: any) => {
      console.log('userfulldetails', res.data.team);
      this.loader.open()
      this.userInfo = res.data
    })
    this.getAllPlayers()

    // back from captain and vice-captain page
    this.localData = JSON.parse(localStorage.getItem('team') || '{}')
    console.log(this.localData, 'localData');
    // end

    if (this.localData != null) {
      this.editTeamArray = this.localData
      if (this.localData.length) {
        console.log(this.localData.length, "This is the length");
      }
      console.log(this.editTeamArray, 'editTeamArray, under local data condition ');

    }

  }

  // Helps in editing the createdteam
  editT() {
    // for edit
    if (this.teamId) {
      this.api.viewTeam(this.matchKey, this.teamId, this.teamNumber).subscribe((res: any) => {
        if (res.success) {
          this.editTeamArray = res.data
          this.allPlayers.filter((x: any) => {
            if (this.editTeamArray) {
              console.log('edit ttttttttt');
              this.editTeamArray.filter((y: any) => {
                if (x.playerid == y.id) {
                  x.isSelected = true;
                  console.log(x, 'matched teams');
                  if (x.role == 'keeper') {
                    this.progressBar[this.total_players.length].Select = true;

                    if (x.team == 'team1') {
                      if (this.team1_player.length <= 6) {
                        this.wk.push(x);
                        this.team1_player.push(x);
                        this.creditLimit = this.creditLimit - x.credit;
                      } else {
                        x.isSelected = false;
                        this.toastr.error(' you can select maximum 7 from one team');
                      }
                    } else if (x.team == 'team2') {
                      if (this.team2_player.length <= 6) {
                        this.wk.push(x);
                        this.team2_player.push(x);
                        this.creditLimit = this.creditLimit - x.credit;
                      } else {
                        x.isSelected = false;
                        this.toastr.error(' you can select maximum 7 from one team');
                      }
                    }

                  }
                  if (x.role == 'batsman') {
                    this.progressBar[this.total_players.length].Select = true;

                    if (x.team == 'team1') {
                      if (this.team1_player.length <= 6) {
                        this.bat.push(x);
                        this.team1_player.push(x);
                        this.creditLimit = this.creditLimit - x.credit;
                      } else {
                        x.isSelected = false;
                        this.toastr.error(' you can select maximum 7 from one team');
                      }
                    } else if (x.team == 'team2') {
                      if (this.team2_player.length <= 6) {
                        this.bat.push(x);
                        this.team2_player.push(x);
                        this.creditLimit = this.creditLimit - x.credit;
                      } else {
                        x.isSelected = false;
                        this.toastr.error(' you can select maximum 7 from one team');
                      }
                    }
                  }
                  if (x.role == 'allrounder') {
                    this.progressBar[this.total_players.length].Select = true;

                    if (x.team == 'team1') {
                      if (this.team1_player.length <= 6) {
                        this.ar.push(x);
                        this.team1_player.push(x);
                        this.creditLimit = this.creditLimit - x.credit;
                      } else {
                        x.isSelected = false;
                        this.toastr.error(' you can select maximum 7 from one team');
                      }
                    } else if (x.team == 'team2') {
                      if (this.team2_player.length <= 6) {
                        this.ar.push(x);
                        this.team2_player.push(x);
                        this.creditLimit = this.creditLimit - x.credit;
                      } else {
                        x.isSelected = false;
                        this.toastr.error(' you can select maximum 7 from one team');
                      }
                    }
                  }
                  if (x.role == 'bowler') {
                    this.progressBar[this.total_players.length].Select = true;

                    if (x.team == 'team1') {
                      if (this.team1_player.length <= 6) {
                        this.bow.push(x);
                        this.team1_player.push(x);
                        this.creditLimit = this.creditLimit - x.credit;
                      } else {
                        x.isSelected = false;
                        this.toastr.error(' you can select maximum 7 from one team');
                      }
                    } else if (x.team == 'team2') {
                      if (this.team2_player.length <= 6) {
                        this.bow.push(x);
                        this.team2_player.push(x);
                        this.creditLimit = this.creditLimit - x.credit;
                      } else {
                        x.isSelected = false;
                        this.toastr.error(' you can select maximum 7 from one team');
                      }
                    }
                  }
                  console.log(x.playerid, 'matching ids of edit team');

                }

              });
              this.total_players.length = this.team1_player.length + this.team2_player.length;
              this.conditions()
              this.total_players = this.wk.concat(this.ar, this.bat, this.bow);
              console.log(this.total_players, "TOTAL of edited players");
              var count: any = 0;
              this.progressBar.filter((x: any) => {
                if (x.Select == true) {
                  count++;
                }
              })
              if (count != this.total_players.length) {
                this.progressBar[this.total_players.length].Select = false;

              }


            }
          })
        }
        else {
          this.editTeamArray = []
          console.log(res, 'when success is false in viewTeam teams ');

        }
        console.log(this.editTeamArray, 'editTeamArray');
      });
    }
  }



  // organize all the players according to thier role
  getAllPlayers() {
    this.api.getAllPlayers(this.matchKey).subscribe((res: any) => {
      this.allPlayers = res.data

      console.log(this.allPlayers, "ALL PLAYERS");
      this.getMatchList();

      this.allPlayers.filter((x: any) => {
        x.isSelected = false;
        // if (!this.teamId) {
        // console.log('simple');
        if (x.role === 'keeper') {
          this.keeper.push(x);
        }
        else if (x.role === 'batsman') {
          this.bats.push(x);
        }
        else if (x.role === 'bowler') {
          this.bowler.push(x);
        }
        else if (x.role === 'allrounder') {
          this.allRound.push(x);
        }

        if (this.localData.length) {
          console.log("Local Data Condtitions");
          this.editTeamArray.filter((y: any) => {
            // y.isSelected=false
            if (x.playerid == y.playerid) {
              x.isSelected = true;
              console.log(x, 'matched teams localdataaaa');

              if (x.role == 'keeper') {
                this.progressBar[this.total_players.length].Select = true;

                if (x.team == 'team1') {
                  if (this.team1_player.length <= 6) {
                    this.wk.push(x);
                    this.team1_player.push(x);
                    this.creditLimit = this.creditLimit - x.credit;
                  } else {
                    x.isSelected = false;
                    this.toastr.error(' you can select maximum 7 from one team');
                  }
                } else if (x.team == 'team2') {
                  if (this.team2_player.length <= 6) {
                    this.wk.push(x);
                    this.team2_player.push(x);
                    this.creditLimit = this.creditLimit - x.credit;
                  } else {
                    x.isSelected = false;
                    this.toastr.error(' you can select maximum 7 from one team');
                  }
                }

              }
              if (x.role == 'batsman') {
                this.progressBar[this.total_players.length].Select = true;

                if (x.team == 'team1') {
                  if (this.team1_player.length <= 6) {
                    this.bat.push(x);
                    this.team1_player.push(x);
                    this.creditLimit = this.creditLimit - x.credit;
                  } else {
                    x.isSelected = false;
                    this.toastr.error(' you can select maximum 7 from one team');
                  }
                } else if (x.team == 'team2') {
                  if (this.team2_player.length <= 6) {
                    this.bat.push(x);
                    this.team2_player.push(x);
                    this.creditLimit = this.creditLimit - x.credit;
                  } else {
                    x.isSelected = false;
                    this.toastr.error(' you can select maximum 7 from one team');
                  }
                }
              }
              if (x.role == 'allrounder') {
                this.progressBar[this.total_players.length].Select = true;

                if (x.team == 'team1') {
                  if (this.team1_player.length <= 6) {
                    this.ar.push(x);
                    this.team1_player.push(x);
                    this.creditLimit = this.creditLimit - x.credit;
                  } else {
                    x.isSelected = false;
                    this.toastr.error(' you can select maximum 7 from one team');
                  }
                } else if (x.team == 'team2') {
                  if (this.team2_player.length <= 6) {
                    this.ar.push(x);
                    this.team2_player.push(x);
                    this.creditLimit = this.creditLimit - x.credit;
                  } else {
                    x.isSelected = false;
                    this.toastr.error(' you can select maximum 7 from one team');
                  }
                }
              }
              if (x.role == 'bowler') {
                this.progressBar[this.total_players.length].Select = true;

                if (x.team == 'team1') {
                  if (this.team1_player.length <= 6) {
                    this.bow.push(x);
                    this.team1_player.push(x);
                    this.creditLimit = this.creditLimit - x.credit;
                  } else {
                    x.isSelected = false;
                    this.toastr.error(' you can select maximum 7 from one team');
                  }
                } else if (x.team == 'team2') {
                  if (this.team2_player.length <= 6) {
                    this.bow.push(x);
                    this.team2_player.push(x);
                    this.creditLimit = this.creditLimit - x.credit;
                  } else {
                    x.isSelected = false;
                    this.toastr.error(' you can select maximum 7 from one team');
                  }
                }
              }
              console.log(x.playerid, 'matching ids of edit team');

            }

          });
          this.total_players.length = this.team1_player.length + this.team2_player.length;
          this.conditions()
          this.total_players = this.wk.concat(this.ar, this.bat, this.bow);
          console.log(this.total_players, "TOTAL of local players");
          var count: any = 0;

          this.progressBar.filter((x: any) => {
            if (x.Select == true) {
              count++;
            }
          })
          if (count != this.total_players.length) {
            this.progressBar[this.total_players.length].Select = false;

          }
        }
        // end of local data conditions 
      })
      if (this.teamId) {
        this.editT();
      }
    })
  }

// getting specific match data by matching matchkey 
  getMatchList() {
    this.api.getMatchlist().subscribe((res: any) => {
      this.upcoming = res.data.upcomingMatches
      this.loader.close();
      console.log(this.upcoming, "RESPONSE");
      this.upcoming.filter((x: any) => {
        if (x.id == this.matchKey) {
          this.match = x;
          console.log(this.match, "MATCH");
          this.timeStart = Date.parse(x.time_start);
          console.log(this.timeStart, "START");
          this.finalDate = (this.timeStart - this.myDate) / 1000;
          console.log(this.finalDate, "FINAL");
        }
      })
    })

  }
  // conditions to disable rest players 
  disabled() {
    this.allPlayers.filter((x: any) => {
      if (this.wkBool) {
        if (x.role == 'keeper') {
          if (x.isSelected) {
            x.disable = false
          }
          if (x.isSelected == false) {
            x.disable = true
          }
        }
      }
      if (this.batBool) {
        if (x.role == 'batsman') {
          if (x.isSelected) {
            x.disable = false
          }
          if (x.isSelected == false) {
            x.disable = true
          }
        }
      }
      if (this.arBool) {
        if (x.role == 'allrounder') {
          if (x.isSelected) {
            x.disable = false
          }
          if (x.isSelected == false) {
            x.disable = true
          }
        }
      }
      if (this.bowlBool) {
        if (x.role == 'bowler') {
          if (x.isSelected) {
            x.disable = false
          }
          if (x.isSelected == false) {
            x.disable = true
          }
        }
      }


      //  false conditions
      if (this.wkBool == false) {
        if (x.role == 'keeper') {
          if (x.isSelected == false) {
            x.disable = false
          }
        }
      }

      if (this.batBool == false) {
        if (x.role == 'batsman') {
          if (x.isSelected == false) {
            x.disable = false
          }
        }
      }

      if (this.arBool == false) {
        if (x.role == 'allrounder') {
          if (x.isSelected == false) {
            x.disable = false
          }
        }
      }

      if (this.bowlBool == false) {
        if (x.role == 'bowler') {
          if (x.isSelected == false) {
            x.disable = false
          }
        }
      }

      //  for team disable
      if (this.team1Bool) {
        if (x.team == 'team1') {
          if (x.isSelected) {
            x.disable = false
          }
          if (x.isSelected == false) {
            x.disable = true
          }
        }
      }
      if (this.team2Bool) {
        if (x.team == 'team2') {
          if (x.isSelected) {
            x.disable = false
          }
          if (x.isSelected == false) {
            x.disable = true
          }
        }
      }
    })
  }


  onPlayer(key: any) {
    this.allPlayers.filter((x: any) => {
      if (x.players_key == key) {
        x.isSelected = !x.isSelected;
        if (x.isSelected == true) {
          if (x.role == 'keeper' && this.total_players.length != 11) {
            if (this.wk.length < 4 && this.creditLimit > 0) {
              this.progressBar[this.total_players.length].Select = true;

// condition to choose players according to their minim um conditions 
              if (this.total_players.length >= 5 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length < 1 && this.bow.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batter are required')
                return
              }
              else if (this.total_players.length >= 6 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length == 1 && this.bow.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batter are required ')
                return
              }
              if (this.total_players.length >= 6 && this.ar.length >= 1 && this.wk.length >= 1 && this.bow.length == 1 && this.bat.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batter are required')
                return
              }
              else if (this.total_players.length >= 7 && this.wk.length >= 1 && this.bow.length >= 3 && this.ar.length < 1 && this.bat.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batter are required ')
                return
              }
              else if (this.total_players.length >= 7 && this.wk.length >= 1 && this.bat.length >= 3 && this.ar.length < 1 && this.bow.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required ')
                return
              }
              else if (this.total_players.length >= 7 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length == 1 && this.bow.length == 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required ')
                return
              }
              else if (this.total_players.length >= 7 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length == 2 && this.bow.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required')
                return
              }
              else if (this.total_players.length >= 7 && this.ar.length >= 1 && this.wk.length >= 1 && this.bow.length == 2 && this.bat.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batter are required')
                return
              }
              if (this.total_players.length == 8 && this.bat.length >= 3 && this.bow.length == 1 && this.wk.length >= 1 && this.ar.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required ')
                return
                this.toastr.warning('stop brooo 2')
              }
              if (this.total_players.length == 9 && this.bat.length >= 3 && this.bow.length == 2 && this.wk.length >= 1 && this.ar.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required ')
                return
                this.toastr.warning('stop brooo 6')
              }
              if (this.total_players.length == 8 && this.bow.length >= 3 && this.bat.length == 1 && this.wk.length >= 1 && this.ar.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batters are required ')
                return
                this.toastr.warning('stop brooo 4')
              }
              if (this.total_players.length == 9 && this.bow.length >= 3 && this.bat.length == 2 && this.wk.length >= 1 && this.ar.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batters are required ')
                return
                this.toastr.warning('stop brooo 8')
              }
              else if (this.total_players.length >= 8 && this.ar.length >= 1 && this.bat.length >= 3 && this.wk.length >= 1 && this.bow.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required ')
                return
              }
              else if (this.total_players.length >= 8 && this.ar.length >= 1 && this.bow.length >= 3 && this.wk.length >= 1 && this.bat.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3  batter are required ')
                return
              }
              else if (this.total_players.length >= 8 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length == 2 && this.bow.length == 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required ')
                return
              }
              else if (this.total_players.length >= 8 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length == 1 && this.bow.length == 2) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required ')
                return
              }
              else if (this.total_players.length >= 9 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length == 2 && this.bow.length == 2) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required ')
                return
              }
              else if (this.total_players.length >= 9 && this.ar.length >= 1 && this.wk.length >= 1 && this.bow.length >= 3 && this.bat.length == 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batter are required ')
                return
              }
              else if (this.total_players.length >= 9 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length >= 3 && this.bow.length == 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required')
                return
              }
              else if (this.total_players.length >= 10 && this.bow.length >= 3 && this.bat.length >= 3 && this.wk.length >= 1 && this.ar.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 1 AR is required ')
                return
              }
              else if (this.total_players.length >= 10 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length >= 3 && this.bow.length == 2) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required')
                return
              }
              else if (this.total_players.length >= 10 && this.ar.length >= 1 && this.wk.length >= 1 && this.bow.length >= 3 && this.bat.length == 2) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batter are required')
                return
              }



              if (x.team == 'team1') {
                if (this.team1_player.length < 7) {
                  this.wk.push(x);
                  this.team1_player.push(x);
                  this.creditLimit = this.creditLimit - x.credit;
                }
                else {
                  x.isSelected = false;
                  this.toastr.error("Maximun player should be 7 from one team")
                }
              }
              else if (x.team == 'team2') {
                if (this.team2_player.length < 7) {
                  this.wk.push(x);
                  this.team2_player.push(x);
                  this.creditLimit = this.creditLimit - x.credit;
                }
                // user can select only 7 memeber from one team 
                else {
                  x.isSelected = false;
                  this.toastr.error("Maximun player should be 7 from one team")
                }
              }
            }
            else {
              x.isSelected = false;
              this.toastr.error("Only 4 Wicket Keepers Allowed");
            }
          }
          else if (x.role == 'allrounder' && this.total_players.length != 11) {
            if (this.ar.length < 4 && this.creditLimit > 0) {
              this.progressBar[this.total_players.length].Select = true;
              if (this.total_players.length >= 5 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length < 1 && this.bow.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batter are required')
                return
              }
              else if (this.total_players.length >= 7 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length == 2 && this.bow.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required')
                return
              }
              else if (this.total_players.length >= 7 && this.ar.length >= 1 && this.wk.length >= 1 && this.bow.length == 2 && this.bat.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batter are required')
                return
              }
              else if (this.total_players.length >= 6 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length == 1 && this.bow.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batter are required')
                return
              }
              if (this.total_players.length >= 6 && this.ar.length >= 1 && this.wk.length >= 1 && this.bow.length == 1 && this.bat.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batter are required')
                return
              }
              else if (this.total_players.length >= 7 && this.ar.length >= 1 && this.bat.length >= 3 && this.wk.length < 1 && this.bow.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required ')
                return
              }
              else if (this.total_players.length >= 7 && this.ar.length >= 1 && this.bow.length >= 3 && this.wk.length < 1 && this.bat.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batter are required ')
                return
              }
              else if (this.total_players.length >= 7 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length == 1 && this.bow.length == 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required ')
                return
              }
              else if (this.total_players.length == 8 && this.bat.length >= 3 && this.bow.length == 1 && this.ar.length >= 1 && this.wk.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required ')
                return
                this.toastr.warning('stop brooo 1')
              }
              else if (this.total_players.length == 9 && this.bat.length >= 3 && this.bow.length == 2 && this.ar.length >= 1 && this.wk.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required ')
                return
                this.toastr.warning('stop brooo 5')
              }
              if (this.total_players.length == 8 && this.bow.length >= 3 && this.bat.length == 1 && this.ar.length >= 1 && this.wk.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batters are required ')
                return
                this.toastr.warning('stop brooo 3')
              }

              if (this.total_players.length == 9 && this.bow.length >= 3 && this.bat.length == 2 && this.ar.length >= 1 && this.wk.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batters are required ')
                return
                this.toastr.warning('stop brooo 7')
              }
              else if (this.total_players.length >= 8 && this.ar.length >= 1 && this.bat.length >= 3 && this.wk.length >= 1 && this.bow.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required ')
                return
              }
              else if (this.total_players.length >= 8 && this.ar.length >= 1 && this.bow.length >= 3 && this.wk.length >= 1 && this.bat.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3  batter are required ')
                return
              }
              else if (this.total_players.length >= 8 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length == 2 && this.bow.length == 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required ')
                return
              }
              else if (this.total_players.length >= 8 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length == 1 && this.bow.length == 2) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required ')
                return
              }
              else if (this.total_players.length >= 9 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length == 2 && this.bow.length == 2) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required ')
                return
              }
              else if (this.total_players.length >= 9 && this.ar.length >= 1 && this.wk.length >= 1 && this.bow.length >= 3 && this.bat.length == 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batter are required ')
                return
              }
              else if (this.total_players.length >= 9 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length >= 3 && this.bow.length == 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required')
                return
              }
              else if (this.total_players.length >= 10 && this.bow.length >= 3 && this.bat.length >= 3 && this.ar.length >= 1 && this.wk.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 1 wk is required ')
                return
              }
              else if (this.total_players.length >= 10 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length >= 3 && this.bow.length == 2) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required')
                return
              }
              else if (this.total_players.length >= 10 && this.ar.length >= 1 && this.wk.length >= 1 && this.bow.length >= 3 && this.bat.length == 2) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batter are required')
                return
              }



              if (x.team == 'team1') {
                if (this.team1_player.length < 7) {
                  this.ar.push(x);
                  this.team1_player.push(x);
                  this.creditLimit = this.creditLimit - x.credit;
                }
                else {
                  x.isSelected = false;
                  this.toastr.error("Maximun player should be 7 from one team")
                }
              }
              else if (x.team == 'team2') {
                if (this.team2_player.length < 7) {
                  this.ar.push(x);
                  this.team2_player.push(x);
                  this.creditLimit = this.creditLimit - x.credit;
                }
                else {
                  x.isSelected = false;
                  this.toastr.error("Maximun player should be 7 from one team")
                }
              }
            }
            else {
              x.isSelected = false;
              this.toastr.error("Only 4 All Rounder Allowed");
            }
          }
          else if (x.role == 'batsman' && this.total_players.length != 11) {
            if (this.bat.length < 6 && this.creditLimit > 0) {
              this.progressBar[this.total_players.length].Select = true;
              if (this.total_players.length >= 7 && this.ar.length >= 1 && this.bat.length >= 3 && this.wk.length < 1 && this.bow.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required ')
                return
              }
              else if (this.total_players.length >= 7 && this.wk.length >= 1 && this.bat.length >= 3 && this.ar.length < 1 && this.bow.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required ')
                return
              }
              else if (this.total_players.length >= 8 && this.ar.length >= 1 && this.bat.length >= 3 && this.wk.length >= 1 && this.bow.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required ')
                return
              }
              else if (this.total_players.length >= 9 && this.bow.length >= 3 && this.bat.length >= 3 && this.ar.length < 1 && this.wk.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 1 wk is required ')
                return
              }
              else if (this.total_players.length >= 9 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length >= 3 && this.bow.length == 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required')
                return
              }
              else if (this.total_players.length >= 10 && this.bow.length >= 3 && this.bat.length >= 3 && this.ar.length >= 1 && this.wk.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 1 wk is required ')
                return
              }
              else if (this.total_players.length >= 10 && this.bow.length >= 3 && this.bat.length >= 3 && this.wk.length >= 1 && this.ar.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 1 AR is required ')
                return
              }
              else if (this.total_players.length >= 10 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length >= 3 && this.bow.length == 2) {
                x.isSelected = false;
                this.toastr.error('minimum 3 bowler are required')
                return
              }


              if (x.team == 'team1') {
                if (this.team1_player.length < 7) {
                  this.bat.push(x);
                  this.team1_player.push(x);
                  this.creditLimit = this.creditLimit - x.credit;
                }
                else {
                  x.isSelected = false;
                  this.toastr.error("Maximun player should be 7 from one team")
                }
              }
              else if (x.team == 'team2') {
                if (this.team2_player.length < 7) {
                  this.bat.push(x);
                  this.team2_player.push(x);
                  this.creditLimit = this.creditLimit - x.credit;
                }
                else {
                  x.isSelected = false;
                  this.toastr.error("Maximun player should be 7 from one team")
                }
              }
            }
            else {
              x.isSelected = false;
              this.toastr.error("Only 6 Batsman Allowed");
            }
          }
          else if (x.role == 'bowler' && this.total_players.length != 11) {
            if (this.bow.length < 6 && this.creditLimit > 0) {
              this.progressBar[this.total_players.length].Select = true;
              if (this.total_players.length >= 7 && this.ar.length >= 1 && this.bow.length >= 3 && this.wk.length < 1 && this.bat.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batter are required ')
                return
              }
              else if (this.total_players.length >= 7 && this.wk.length >= 1 && this.bow.length >= 3 && this.ar.length < 1 && this.bat.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batter are required ')
                return
              }
              else if (this.total_players.length >= 8 && this.ar.length >= 1 && this.bow.length >= 3 && this.wk.length >= 1 && this.bat.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3  batter are required ')
                return
              }
              else if (this.total_players.length >= 9 && this.bow.length >= 3 && this.bat.length >= 3 && this.ar.length < 1 && this.wk.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 1 wk is required ')
                return
              }
              else if (this.total_players.length >= 9 && this.ar.length >= 1 && this.wk.length >= 1 && this.bow.length >= 3 && this.bat.length == 1) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batter are required ')
                return
              }

              else if (this.total_players.length >= 10 && this.bow.length >= 3 && this.bat.length >= 3 && this.ar.length >= 1 && this.wk.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 1 wk is required ')
                return
              }
              else if (this.total_players.length >= 10 && this.bow.length >= 3 && this.bat.length >= 3 && this.wk.length >= 1 && this.ar.length < 1) {
                x.isSelected = false;
                this.toastr.error('minimum 1 AR is required ')
                return
              }
              else if (this.total_players.length >= 10 && this.ar.length >= 1 && this.wk.length >= 1 && this.bow.length >= 3 && this.bat.length == 2) {
                x.isSelected = false;
                this.toastr.error('minimum 3 batter are required')
                return
              }


              if (x.team == 'team1') {
                if (this.team1_player.length < 7) {
                  this.bow.push(x);
                  this.team1_player.push(x);
                  this.creditLimit = this.creditLimit - x.credit;
                }
                else {
                  x.isSelected = false;
                  this.toastr.error("Maximun player should be 7 from one team")
                }
              }
              else if (x.team == 'team2') {
                if (this.team2_player.length < 7) {
                  this.bow.push(x);
                  this.team2_player.push(x);
                  this.creditLimit = this.creditLimit - x.credit;
                }
                else {
                  x.isSelected = false;
                  this.toastr.error("Maximun player should be 7 from one team")
                }
              }
            }
            else {
              x.isSelected = false;
              this.toastr.error("Only 6 Bowlers Allowed");
            }
          }
          else if (this.total_players.length = 10) {
            x.isSelected = false;
            this.toastr.error("Maximum player should be 11")
          }
        }
        else if (x.isSelected == false) {
          if (x.role == 'keeper') {
            this.wkBool = false
            this.batBool = false
            this.bowlBool = false
            this.arBool = false
            this.disabled()
            this.wk.splice(this.wk.indexOf(x), 1);
            this.creditLimit = this.creditLimit + Number(x.credit);
            if (x.team == 'team1') {
              this.team1Bool = false
              this.disabled()
              this.team1_player.splice(this.team1_player.indexOf(x), 1);
            }
            else if (x.team == 'team2') {
              this.team2Bool = false
              this.disabled()
              this.team2_player.splice(this.team2_player.indexOf(x), 1);
            }
          }
          else if (x.role == 'allrounder') {
            this.wkBool = false
            this.batBool = false
            this.bowlBool = false
            this.arBool = false
            this.disabled()
            this.ar.splice(this.ar.indexOf(x), 1);
            this.creditLimit = this.creditLimit + Number(x.credit);
            if (x.team == 'team1') {
              this.team1Bool = false
              this.disabled()
              this.team1_player.splice(this.team1_player.indexOf(x), 1);
            }
            else if (x.team == 'team2') {
              this.team2Bool = false
              this.disabled()
              this.team2_player.splice(this.team2_player.indexOf(x), 1);
            }
          }
          else if (x.role == 'batsman') {
            this.wkBool = false
            this.batBool = false
            this.bowlBool = false
            this.arBool = false
            this.disabled()
            this.bat.splice(this.bat.indexOf(x), 1);
            this.creditLimit = this.creditLimit + Number(x.credit);
            if (x.team == 'team1') {
              this.team1Bool = false
              this.disabled()
              this.team1_player.splice(this.team1_player.indexOf(x), 1);
            }
            else if (x.team == 'team2') {
              this.team2Bool = false
              this.disabled()
              this.team2_player.splice(this.team2_player.indexOf(x), 1);
            }
          }
          else if (x.role == 'bowler') {
            this.wkBool = false
            this.batBool = false
            this.bowlBool = false
            this.arBool = false
            this.disabled()
            this.bow.splice(this.bow.indexOf(x), 1);
            this.creditLimit = this.creditLimit + Number(x.credit);
            if (x.team == 'team1') {
              this.team1Bool = false
              this.disabled()
              this.team1_player.splice(this.team1_player.indexOf(x), 1);
            }
            else if (x.team == 'team2') {
              this.team2Bool = false
              this.disabled()
              this.team2_player.splice(this.team2_player.indexOf(x), 1);
            }
          }
          else if (this.total_players.length = 10) {
            x.isSelected = false;
            this.toastr.error("Maximum player should be 11")
          }
        }
      }
      this.total_players.length = this.team1_player.length + this.team2_player.length;
      this.total_players = this.wk.concat(this.ar, this.bat, this.bow);
    })
    console.log(this.total_players, "TOTAL");

    var count: any = 0;

    this.progressBar.filter((x: any) => {
      if (x.Select == true) {
        count++;
      }
    })
    if (count != this.total_players.length) {
      this.progressBar[this.total_players.length].Select = false;

    }


    // conditions 



    this.conditions()
  }

  conditions() {
    if (this.wk.length == 4) {
      this.wkBool = true
      this.disabled()
    }
    if (this.bat.length == 6) {
      this.batBool = true
      this.disabled()
    }
    if (this.ar.length == 4) {
      this.arBool = true
      this.disabled()
    }
    if (this.bow.length == 6) {
      this.bowlBool = true
      this.disabled()
    }
    if (this.team1_player.length == 7) {
      this.team1Bool = true
      this.disabled()
    }
    if (this.team2_player.length == 7) {
      this.team2Bool = true
      this.disabled()
    }


    if (this.total_players.length == 8 && this.bat.length >= 3 && this.bow.length == 1 && this.ar.length >= 1 && this.wk.length < 1) {
      this.batBool = true
      this.arBool = true
      this.disabled()
      // this.toastr.warning('stop brooo 1')
    }
    if (this.total_players.length == 9 && this.bat.length >= 3 && this.bow.length == 2 && this.ar.length >= 1 && this.wk.length < 1) {
      this.batBool = true
      this.arBool = true
      this.disabled()
      // this.toastr.warning('stop brooo 5')
    }
    if (this.total_players.length == 8 && this.bat.length >= 3 && this.bow.length == 1 && this.wk.length >= 1 && this.ar.length < 1) {
      this.batBool = true
      this.wkBool = true
      this.disabled()
      // this.toastr.warning('stop brooo 2')
    }
    if (this.total_players.length == 9 && this.bat.length >= 3 && this.bow.length == 2 && this.wk.length >= 1 && this.ar.length < 1) {
      this.batBool = true
      this.wkBool = true
      this.disabled()
      // this.toastr.warning('stop brooo 6')
    }
    if (this.total_players.length == 8 && this.bow.length >= 3 && this.bat.length == 1 && this.ar.length >= 1 && this.wk.length < 1) {
      this.bowlBool = true
      this.arBool = true
      this.disabled()
      // this.toastr.warning('stop brooo 3')
    }

    if (this.total_players.length == 9 && this.bow.length >= 3 && this.bat.length == 2 && this.ar.length >= 1 && this.wk.length < 1) {
      this.bowlBool = true
      this.arBool = true
      this.disabled()
      // this.toastr.warning('stop brooo 7')
    }
    if (this.total_players.length == 8 && this.bow.length >= 3 && this.bat.length == 1 && this.wk.length >= 1 && this.ar.length < 1) {
      this.bowlBool = true
      this.wkBool = true
      this.disabled()
      // this.toastr.warning('stop brooo 4')
    }
    if (this.total_players.length == 9 && this.bow.length >= 3 && this.bat.length == 2 && this.wk.length >= 1 && this.ar.length < 1) {
      this.bowlBool = true
      this.wkBool = true
      this.disabled()
      // this.toastr.warning('stop brooo 8')
    }
    if (this.total_players.length >= 5 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length < 1 && this.bow.length < 1) {
      this.wkBool = true
      this.arBool = true
      this.disabled()
      console.log('stoppp');
    }
    if (this.total_players.length >= 6 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length == 1 && this.bow.length < 1) {
      this.wkBool = true
      this.arBool = true
      this.disabled()
    }
    if (this.total_players.length >= 6 && this.ar.length >= 1 && this.wk.length >= 1 && this.bow.length == 1 && this.bat.length < 1) {
      this.wkBool = true
      this.arBool = true
      this.disabled()
    }
    if (this.total_players.length >= 7 && this.ar.length >= 1 && this.bat.length >= 3 && this.wk.length < 1 && this.bow.length < 1) {
      this.batBool = true
      this.arBool = true
      this.disabled()
    }
    if (this.total_players.length >= 7 && this.ar.length >= 1 && this.bow.length >= 3 && this.wk.length < 1 && this.bat.length < 1) {
      this.bowlBool = true
      this.arBool = true
      this.disabled()
    }
    if (this.total_players.length >= 7 && this.wk.length >= 1 && this.bow.length >= 3 && this.ar.length < 1 && this.bat.length < 1) {
      this.wkBool = true
      this.bowlBool = true
      this.disabled()
    }
    if (this.total_players.length >= 7 && this.wk.length >= 1 && this.bat.length >= 3 && this.ar.length < 1 && this.bow.length < 1) {
      this.batBool = true
      this.wkBool = true
      this.disabled()
    }
    if (this.total_players.length >= 7 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length == 1 && this.bow.length == 1) {
      this.wkBool = true
      this.arBool = true
      this.disabled()
    }
    if (this.total_players.length >= 8 && this.ar.length >= 1 && this.bat.length >= 3 && this.wk.length >= 1 && this.bow.length < 1) {
      this.batBool = true
      this.arBool = true
      this.wkBool = true
      this.disabled()
    }
    if (this.total_players.length >= 8 && this.ar.length >= 1 && this.bow.length >= 3 && this.wk.length >= 1 && this.bat.length < 1) {
      this.bowlBool = true
      this.arBool = true
      this.wkBool = true
      this.disabled()
    }
    if (this.total_players.length >= 8 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length == 2 && this.bow.length == 1) {
      this.arBool = true
      this.wkBool = true
      this.disabled()
    }
    if (this.total_players.length >= 8 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length == 1 && this.bow.length == 2) {
      this.arBool = true
      this.wkBool = true
      this.disabled()
    }
    if (this.total_players.length >= 9 && this.bow.length >= 3 && this.bat.length >= 3 && this.ar.length < 1 && this.wk.length < 1) {
      this.bowlBool = true
      this.batBool = true
      this.disabled()
    }
    if (this.total_players.length >= 9 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length == 2 && this.bow.length == 2) {
      this.arBool = true
      this.wkBool = true
      this.disabled()
    }
    if (this.total_players.length >= 9 && this.ar.length >= 1 && this.wk.length >= 1 && this.bow.length >= 3 && this.bat.length == 1) {
      this.bowlBool = true
      this.arBool = true
      this.wkBool = true
      this.disabled()
    }
    if (this.total_players.length >= 9 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length >= 3 && this.bow.length == 1) {
      this.batBool = true
      this.arBool = true
      this.wkBool = true
      this.disabled()
    }
    if (this.total_players.length >= 10 && this.bow.length >= 3 && this.bat.length >= 3 && this.ar.length >= 1 && this.wk.length < 1) {
      this.bowlBool = true
      this.arBool = true
      this.batBool = true
      this.disabled()
    }
    if (this.total_players.length >= 10 && this.bow.length >= 3 && this.bat.length >= 3 && this.wk.length >= 1 && this.ar.length < 1) {
      this.bowlBool = true
      this.batBool = true
      this.wkBool = true
      this.disabled()
    }
    if (this.total_players.length >= 10 && this.ar.length >= 1 && this.wk.length >= 1 && this.bat.length >= 3 && this.bow.length == 2) {
      this.batBool = true
      this.arBool = true
      this.wkBool = true
      this.disabled()
    }
    if (this.total_players.length >= 10 && this.ar.length >= 1 && this.wk.length >= 1 && this.bow.length >= 3 && this.bat.length == 2) {
      this.bowlBool = true
      this.arBool = true
      this.wkBool = true
      this.disabled()
    }
    if (this.total_players.length == 11 && this.ar.length >= 1 && this.wk.length >= 1 && this.bow.length >= 3 && this.bat.length >= 3) {
      this.bowlBool = true
      this.arBool = true
      this.wkBool = true
      this.batBool = true
      this.disabled()
    }
    if (this.total_players.length < 11 && this.ar.length >= 1 && this.wk.length >= 1 && this.bow.length >= 3 && this.bat.length >= 3) {
      this.bowlBool = false
      this.arBool = false
      this.wkBool = false
      this.batBool = false
      this.disabled()
    }
    this.changeDetectorRef.detectChanges()
  }
// sort option in the table's heading 
  sortoptions(filtertype: any, type: any) {
    if (filtertype == 'points' && type == 'keeper') {
      this.imgPoint1 = true;
      if (this.ordertype === 'asc') {
        this.keeper.sort(function (a: any, b: any) {
          return a.totalpoints - b.totalpoints;
        });
        this.ordertype = 'desc';
        this.imgType = !this.imgType
      }
      else {
        this.keeper.sort(function (a: any, b: any) {
          return b.totalpoints - a.totalpoints;
        });
        this.ordertype = 'asc';
        this.imgType = !this.imgType
      }
    }
    if (filtertype == 'points' && type == 'bats') {
      this.imgPoint2 = true;
      if (this.ordertype2 == 'asc') {
        this.bats.sort(function (a: any, b: any) {
          return a.totalpoints - b.totalpoints;
        });
        this.ordertype2 = 'desc';
        this.imgType = !this.imgType
      }
      else {
        this.bats.sort(function (a: any, b: any) {
          return b.totalpoints - a.totalpoints;
        });
        this.ordertype2 = 'asc';
        this.imgType = !this.imgType
      }
    }
    if (filtertype == 'points' && type == 'allRound') {
      this.imgPoint3 = true;
      if (this.ordertype3 == 'asc') {
        this.allRound.sort(function (a: any, b: any) {
          return a.totalpoints - b.totalpoints;
        });
        this.ordertype3 = 'desc';
        this.imgType = !this.imgType
      }
      else {
        this.allRound.sort(function (a: any, b: any) {
          return b.totalpoints - a.totalpoints;
        });
        this.ordertype3 = 'asc';
        this.imgType = !this.imgType
      }
    }
    if (filtertype == 'points' && type == 'bowler') {
      this.imgPoint4 = true;
      if (this.ordertype4 == 'asc') {
        this.bowler.sort(function (a: any, b: any) {
          return a.totalpoints - b.totalpoints;
        });
        this.ordertype4 = 'desc';
        this.imgType = !this.imgType
      }
      else {
        this.bowler.sort(function (a: any, b: any) {
          return b.totalpoints - a.totalpoints;
        });
        this.ordertype4 = 'asc';
        this.imgType = !this.imgType
      }
    }


    // For Credits
    if (filtertype == 'credits' && type == 'keeper') {
      this.imgcredit1 = true;
      if (this.ordertype === 'asc') {
        this.keeper.sort(function (a: any, b: any) {
          return a.credit - b.credit;
        });
        this.ordertype = 'desc';
        this.imgType2 = !this.imgType2
      }
      else {
        this.keeper.sort(function (a: any, b: any) {
          return b.credit - a.credit;
        });
        this.ordertype = 'asc';
        this.imgType2 = !this.imgType2
      }
    }
    if (filtertype == 'credits' && type == 'bats') {
      this.imgcredit2 = true;
      if (this.ordertype2 == 'asc') {
        this.bats.sort(function (a: any, b: any) {
          return a.credit - b.credit;
        });
        this.ordertype2 = 'desc';
        this.imgType2 = !this.imgType2
      }
      else {
        this.bats.sort(function (a: any, b: any) {
          return b.credit - a.credit;
        });
        this.ordertype2 = 'asc';
        this.imgType2 = !this.imgType2
      }
    }
    if (filtertype == 'credits' && type == 'allRound') {
      this.imgcredit3 = true;
      if (this.ordertype3 == 'asc') {
        this.allRound.sort(function (a: any, b: any) {
          return a.credit - b.credit;
        });
        this.ordertype3 = 'desc';
        this.imgType2 = !this.imgType2
      }
      else {
        this.allRound.sort(function (a: any, b: any) {
          return b.credit - a.credit;
        });
        this.ordertype3 = 'asc';
        this.imgType2 = !this.imgType2
      }
    }
    if (filtertype == 'credits' && type == 'bowler') {
      this.imgcredit4 = true;
      if (this.ordertype4 == 'asc') {
        this.bowler.sort(function (a: any, b: any) {
          return a.credit - b.credit;
        });
        this.ordertype4 = 'desc';
        this.imgType2 = !this.imgType2
      }
      else {
        this.bowler.sort(function (a: any, b: any) {
          return b.credit - a.credit;
        });
        this.ordertype4 = 'asc';
        this.imgType2 = !this.imgType2
      }
    }
  }

  // sort(type:any){
  //   if(type=='points'){
  //     this.imgShow=!
  //   }
  // }

// select continue and navigate for the selection of captain and vice captain 
  continueBtn() {
    localStorage.setItem('team', JSON.stringify(this.total_players));
    localStorage.setItem('matchKey', this.matchKey);
    if (this.edit != 'edit' || this.teamNumber == undefined) {
      this.router.navigate(['dashboard/select-captain'], { queryParams: { challengeid: btoa(this.challengeId) } })
    }
    else if (this.edit == 'edit') {
      this.router.navigate(['dashboard/select-captain'], { queryParams: { teamnumber: this.teamNumber } })
    }

  }
  // player info 
  playerInfo(id: any) {
    this.api.getPlayerInfo(id, this.matchKey).subscribe((res: any) => {
      console.log(res, "This is ther frterspiner");
      if (res.success == true) {
        this.playerInfos = res.data
        this.playerMatchesInfo = res.data.matches
      }
    })
    // this.dialog.open(PlayersInfoComponent, {
    //   data: { playerid: id, matchKey: this.matchKey },
    //   width: '40%',
    //   height: '80%',
    //   // panelClass:'full-screen-modal'

    // })
    // console.log(id, 'player id ');
  }


  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
    // history.pushState(null,'','');
  }

}
