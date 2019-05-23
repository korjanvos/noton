import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteListComponent } from './note-list/note-list.component';
import { FormsModule } from "@angular/forms";
import { ValueAuditerDirective } from './value-auditer.directive';
import { MainComponent } from './main/main.component';
import { NotebookNavComponent } from './notebook-nav/notebook-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    ValueAuditerDirective,
    MainComponent,
    NotebookNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
