import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule} from 'angularfire2';
import { firebaseConfig } from './database/firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './service/auth.guard';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';
import { ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from './components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { IconsComponent } from './icons/icons.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCUVFvITyoB1B6_GkCFMBq4PsyfKyS6suo'
    })
  ],
  
  providers: [AuthService, UserService, UserResolver, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
