import { Controller, Get, Param, Query, Redirect, Res } from '@nestjs/common';
import { AppService } from './app.service';
import  axios from 'axios';

let access_token = ''

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('oauth/github/callback')
  getToken(@Query('code') code: string, @Res() res) {
    console.log("code: ", code);
    const url = 'https://github.com/login/oauth/access_token?client_id=0e7191e436f9a25bef4c&client_secret=13b9e18a163d30eac948f520dcde9938647b40c9&code=' + code  
    axios.post(url)
    .then(function (response) {
      access_token = response.data.split('&')[0].split('=')[1];
      res.redirect('http://localhost:5000/client/authorized.html')
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  @Get('create')
  createRepo(@Res() res, @Query('name') name: string) {
    const url = 'https://api.github.com/user/repos';
    const options = {
      headers: {
        "Authorization": `token ${access_token}`,
      },
    };
    const body = {name};
    axios.post(url, body, options)
    .then(response => res.redirect('http://localhost:5000/client/success.html') )
    .catch(err => res.redirect('http://localhost:5000/client/error.html'))
  }

}


