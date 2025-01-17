// dashboard.component.ts
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
  BadgeComponent,
  ButtonModule,
  GridModule,
  CardModule,
  TableModule,
  BadgeModule,
  AvatarModule
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { cilPencil, cilTrash, cilZoom, cilCloudDownload } from '@coreui/icons';

import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    GridModule,
    IconModule,
    CardModule,
    TableModule,
    BadgeModule,
    AvatarModule,
    WidgetsDropdownComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    RowComponent,
    ColComponent,
    ButtonDirective,
    IconDirective,
    ReactiveFormsModule,
    ButtonGroupComponent,
    FormCheckLabelDirective,
    ChartjsComponent,
    CardFooterComponent,
    GutterDirective,
    ProgressBarDirective,
    ProgressComponent,
    WidgetsBrandComponent,
    CardHeaderComponent,
    TableDirective,
    AvatarComponent,
    BadgeComponent
  ]
})
export class DashboardComponent implements OnInit {
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #document: Document = inject(DOCUMENT);
  readonly #renderer: Renderer2 = inject(Renderer2);
  readonly #chartsData: DashboardChartsData = inject(DashboardChartsData);
  readonly #iconSetService = inject(IconSetService);

  constructor() {
    this.#iconSetService.icons = { cilPencil, cilTrash, cilZoom, cilCloudDownload };
  }

  public users: IUser[] = [
    {
      name: 'Bishal Bashyal',
      state: 'Complete',
      registered: '12/20/2024',
      country: 'Male',
      usage: 45,
      period: 'OPD',
      payment: 'Diabetes',
      activity: 'Active',
      avatar: './assets/images/avatars/1.jpg',
      status: 'success',
      color: 'success'
    },
    {
      name: 'Samrat Ghumire',
      state: 'Complete',
      registered: '12/20/2024',
      country: 'Male',
      usage: 45,
      period: 'OPD',
      payment: 'Diabetes',
      activity: 'Active',
      avatar: './assets/images/avatars/2.jpg',
      status: 'success',
      color: 'success'
    },
    {
      name: 'Anil Regmi',
      state: 'In Progress',
      registered: '12/20/2024',
      country: 'Male',
      usage: 45,
      period: 'OPD',
      payment: 'Diabetes',
      activity: 'Active',
      avatar: './assets/images/avatars/3.jpg',
      status: 'warning',
      color: 'warning'
    },
    {
      name: 'Puru Karki',
      state: 'In Progress',
      registered: '1/20/2025',
      country: 'Male',
      usage: 45,
      period: 'OPD',
      payment: 'Diabetes',
      activity: 'Active',
      avatar: './assets/images/avatars/4.jpg',
      status: 'warning',
      color: 'warning'
    }
  ];

  public mainChart: IChartProps = { type: 'line' };
  public mainChartRef: WritableSignal<any> = signal(undefined);
  #mainChartRefEffect = effect(() => {
    if (this.mainChartRef()) {
      this.setChartStyles();
    }
  });
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });

  ngOnInit(): void {
    this.initCharts();
    this.updateChartOnColorModeChange();
  }

  initCharts(): void {
    this.mainChart = this.#chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.#chartsData.initMainChart(value);
    this.initCharts();
  }

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      this.mainChartRef.set($chartRef);
    }
  }

  updateChartOnColorModeChange() {
    const unListen = this.#renderer.listen(
      this.#document.documentElement,
      'ColorSchemeChange',
      () => {
        this.setChartStyles();
      }
    );

    this.#destroyRef.onDestroy(() => {
      unListen();
    });
  }

  setChartStyles() {
    if (this.mainChartRef()) {
      setTimeout(() => {
        const options: ChartOptions = { ...this.mainChart.options };
        const scales = this.#chartsData.getScales();
        this.mainChartRef().options.scales = { ...options.scales, ...scales };
        this.mainChartRef().update();
      });
    }
  }

  // Patient record management methods
  onView(user: IUser): void {
    console.log('Viewing patient:', user);
    alert(`Viewing patient: ${user.name}`);
  }

  onEdit(user: IUser): void {
    console.log('Editing patient:', user);
    alert(`Editing patient: ${user.name}`);
  }

  onDelete(user: IUser): void {
    console.log('Deleting patient:', user);
    this.users = this.users.filter(u => u.name !== user.name);
    alert(`Patient ${user.name} deleted successfully`);
  }

  // Helper method for status color
  getStatusColor(status: string): string {
    return status.toLowerCase() === 'complete' ? 'success' : 'warning';
  }
}