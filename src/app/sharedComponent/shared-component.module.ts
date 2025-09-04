import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Shared components
import { FooterComponent } from './footer/footer.component';
// import { SidebarComponent } from './sidebar/sidebar.component';
// import { UnderDevelopmentComponent } from './under-development/under-development.component';
// import { LocationModalComponent } from './location-modal/location-modal.component';
import { SliceWithTooltipComponent } from './slice-with-tooltip/slice-with-tooltip.component';
// import { LocationSectionSharedComponent } from './location-section-shared/location-section-shared.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
// import { ReusableFormSectionComponent } from './reusable-form-section/reusable-form-section.component';
import { ResponsiveTableComponent } from './responsive-table/responsive-table.component';

// Directives
import { WordCapitalizeDirective } from '../_directive/word-capitalize.directive';
import { AlphabetOnlyDirective } from '../_directive/alphabet-only.directive';
import { NumberOnlyDirective } from '../_directive/number-only.directive';
import { NoSpaceDirective } from '../_directive/no-space.directive';
import { UpperCaseDirective } from '../_directive/upper-case.directive';
import { NumWithDotDirective } from '../_directive/num-with-dot.directive';
import { AlphaNumericDirective } from '../_directive/alpha-numeric.directive';
import { AlphaWithSpaceDirective } from '../_directive/alpha-with-space.directive';
import { DraggableModalDirective } from '../drag-directive';
import { UsdOnlyDirective } from '../usd-only.directive';

// Pipes
import { LineBreakPipe } from '../_pipes/line-break.pipe';
import { FilterPipe } from '../_pipes/filter.pipe';
import { DefaultValuePipe } from '../_pipes/default-value.pipe';
import { AmountInwordPipe } from '../_pipes/amount-inword.pipe';
import { FilterWithChildrenPipe } from '../_pipes/filter-with-children.pipe';
import { CustomSortPipe } from '../_pipes/custom-sort.pipe';

// Third-party modules
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { ChartModule } from 'angular-highcharts';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPrintModule } from 'ngx-print';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { HeaderComponent } from './header/header.component';
import { SortPipe } from '../sort.pipe';

@NgModule({
  declarations: [
    // Components
    HeaderComponent,
    FooterComponent,
    // SidebarComponent,
    // UnderDevelopmentComponent,
    // LocationModalComponent,
    SliceWithTooltipComponent,
    // LocationSectionSharedComponent,
    ConfirmModalComponent,
    // ReusableFormSectionComponent,
    ResponsiveTableComponent,

    // Directives
    WordCapitalizeDirective,
    AlphabetOnlyDirective,
    NumberOnlyDirective,
    NoSpaceDirective,
    UpperCaseDirective,
    NumWithDotDirective,
    AlphaNumericDirective,
    AlphaWithSpaceDirective,
    DraggableModalDirective,
    UsdOnlyDirective,

    // Pipes
    LineBreakPipe,
    FilterPipe,
    DefaultValuePipe,
    AmountInwordPipe,
    FilterWithChildrenPipe,
    CustomSortPipe,
    SortPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxChartsModule,
    // ChartModule,
    NgxPrintModule,
    NgSelectModule,
    NgMultiSelectDropDownModule, // Remove `.forRoot()` for feature modules
    AngularEditorModule,
    NgxPaginationModule,
    DragDropModule,
    CdkDropList,
    CdkDrag,
  ],
  exports: [
    // Modules
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxChartsModule,
    // ChartModule,
    NgxPrintModule,
    NgSelectModule,
    NgMultiSelectDropDownModule,
    AngularEditorModule,
    DragDropModule,
    CdkDropList,
    CdkDrag,

    // Components
    HeaderComponent,
    FooterComponent,
    // SidebarComponent,
    // UnderDevelopmentComponent,
    // LocationModalComponent,
    SliceWithTooltipComponent,
    // LocationSectionSharedComponent,
    ConfirmModalComponent,
    // ReusableFormSectionComponent,
    ResponsiveTableComponent,

    // Directives
    WordCapitalizeDirective,
    AlphabetOnlyDirective,
    NumberOnlyDirective,
    NoSpaceDirective,
    UpperCaseDirective,
    NumWithDotDirective,
    AlphaNumericDirective,
    AlphaWithSpaceDirective,
    DraggableModalDirective,
    UsdOnlyDirective,

    // Pipes
    LineBreakPipe,
    FilterPipe,
    DefaultValuePipe,
    AmountInwordPipe,
    FilterWithChildrenPipe,
    // CustomSortPipe,
    SortPipe
  ]
})
export class SharedComponentModule { }
