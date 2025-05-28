import { Component, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { CardModule } from 'primeng/card';
import { ChartOptions, ChartType } from 'chart.js';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { ButtonDirective } from 'primeng/button';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-orders-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
    CardModule,
    DropdownModule,
    FormsModule,
    MenuModule,
    ButtonDirective,
    TranslateModule,
  ],
  templateUrl: './orders-chart.component.html',
  styleUrl: './orders-chart.component.scss',
})
export class OrdersChartComponent {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective<'line'>;
  hoverLinePlugin: any = [
    {
      id: 'hoverLine',
      beforeTooltipDraw(chart: any) {
        const {
          ctx,
          tooltip,
          chartArea: { top, bottom },
          scales: { x, y },
        } = chart;

        if (tooltip._active && tooltip._active.length) {
          const activePoint = tooltip._active[0];
          const xCoor = activePoint.element.x;
          const yCoor = activePoint.element.y; // Get the y-coordinate of the intersection point

          // Draw the vertical dashed line
          ctx.save();
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'gray';
          ctx.setLineDash([6, 6]);
          ctx.moveTo(xCoor, top);
          ctx.lineTo(xCoor, bottom);
          ctx.stroke();
          ctx.restore();

          // Draw the circle at the intersection
          ctx.save();
          ctx.beginPath();
          ctx.arc(xCoor, yCoor, 6, 0, 2 * Math.PI); // Draw a circle with radius 5 at (xCoor, yCoor)
          ctx.fillStyle = 'rgba(16, 185, 129, 1)'; // Circle color
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'white'; // Circle border color
          ctx.stroke();
          ctx.restore();
        }
      },
    },
  ];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    layout: {
      padding: 10,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          padding: 10,
          autoSkip: false,
          maxRotation: 15,
          minRotation: 0,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Nr. of Orders',
          padding: 10,
        },
        grid: {
          display: true,
          color: 'rgba(80, 102, 120, 0.25)',
        },
        ticks: {
          padding: 10,
          autoSkip: false,
          maxRotation: 15,
          minRotation: 0.3,
          includeBounds: true,
        },
        min: 0,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'nearest', // Adjusts the tooltip mode to nearest data point
        intersect: false, // Tooltip will appear even if not directly over the point
        callbacks: {
          title: function (tooltipItems: any[]) {
            //Show name of the month for last month dataset
            const dataIndex = tooltipItems[0].dataIndex;
            const labels = tooltipItems[0].chart.data.labels;
            const datasetLength = tooltipItems[0].dataset.data.length;

            if (datasetLength >= 28) {
              const dateLabel = labels[dataIndex];
              const monthIndex = new Date().getMonth() - 1;
              // const monthNames = [
              //   'January',
              //   'February',
              //   'March',
              //   'April',
              //   'May',
              //   'June',
              //   'July',
              //   'August',
              //   'September',
              //   'October',
              //   'November',
              //   'December',
              // ];
              // const monthName = monthNames[monthIndex];

              const monthNamesEng = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ];

              const monthNamesRo = [
                'Ianuarie',
                'Februarie',
                'Martie',
                'Aprilie',
                'Mai',
                'Iunie',
                'Iulie',
                'August',
                'Septembrie',
                'Octombrie',
                'Noiembrie',
                'Decembrie',
              ];

              const monthNamesRu = [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь',
              ];

              let monthName = '';

              if (localStorage.getItem('lang') === 'en') {
                monthName = monthNamesEng[monthIndex];
              } else if (localStorage.getItem('lang') === 'ro') {
                monthName = monthNamesRo[monthIndex];
              } else {
                monthName = monthNamesRu[monthIndex];
              }
              return [`${monthName} ${dateLabel}`];
            } else {
              // For other datasets, show only the date
              const dateLabel = labels[dataIndex];
              return [`${dateLabel}`];
            }
          },
          label: function (tooltipItem: any) {
            const datasetLabel = tooltipItem.dataset.label;
            const value = tooltipItem.raw;
            return `${datasetLabel}: ${value}`;
          },
        },
      },
    },
  };

  chartDataArray = [
    {
      data: [3, 1, 0, 0, 2, 4, 2],
      labels: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    },
    {
      data: this.generateDataForLastMonth(),
      labels: this.generateLabelsForLastMonth(),
    },
    {
      data: [24, 13, 10, 26, 8, 0, 4, 14, 0, 11, 23, 5],
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
  ];

  public chartData: any = this.chartDataArray[0].data;
  public lineChartLabels: any = this.chartDataArray[0].labels;

  public lineChartData: any = {
    labels: this.lineChartLabels,
    datasets: [
      {
        label: 'Orders',
        data: this.chartData,
        fill: true,
        borderColor: 'rgba(16, 185, 129, 1)',
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: '',
        lineTension: 0.2,
        pointRadius: 0,
        // pointBorderWidth: 0,
        // pointBorderColor: 'white',
        // pointHoverBackgroundColor: 'rgba(16, 185, 129, 1)',
        // pointHoverBorderWidth: 2,
        // pointHoverRadius: 6,
      },
    ],
  };

  public lineChartType: ChartType = 'line';
  public lineChartLegend = false;

  constructor(private translate: TranslateService) {
    // Register the hoverLine plugin globally
    // Chart.register(this.hoverLinePlugin);
  }

  setGradient(): void {
    // Ensure the chart is properly initialized
    if (!this.chart || !this.chart.chart) return;

    const ctx = this.chart.chart.ctx; // Get the chart context
    if (!ctx) return;

    // Create the gradient
    const gradient = ctx.createLinearGradient(0, 25, 0, 300);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.5)');
    // gradient.addColorStop(0.35, 'rgba(16, 185, 129, 0.25)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0.05)');

    // Update the chart data with the gradient
    (this.lineChartData.datasets[0] as any).backgroundColor = gradient;

    // Force the chart to update with the new gradient otherwise it will be black
    this.chart.update();
  }

  // updateChartOptions(): void {
  //   if (!this.chart) return;
  //   const maxDataValue = Math.max(...this.chartData);
  //   const padding = 2; // Adjust the padding as needed
  //
  //   // Update y-axis max value
  //   this.chart!.chart!.options!.scales!['y']!.max = maxDataValue + padding;
  //   this.chart.update();
  // }

  chartInfoPeriod: any[] = [
    { label: 'Last 7 days', code: '0' },
    { label: 'Last month', code: '1' },
    { label: 'Last year', code: '2' },
  ];

  selectedOption: string = this.chartInfoPeriod[0].label;
  options: any[] = [];
  selectedOptionId = new BehaviorSubject(0);

  ngOnInit() {
    this.options = this.chartInfoPeriod.map((item) => ({
      label: item.label,
      command: () => this.changeOption(item),
    }));

    // Initial setup of options
    this.updateTranslations();

    // Subscribe to language change events
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateTranslations();
      this.updateLabels();
    });
  }

  ngAfterViewInit(): void {
    this.setGradient();
    // this.updateChartOptions();
    this.updateLabels();
  }

  updateTranslations() {
    this.translate
      .get([
        'DASHBOARD.ORDERS_CHART.CHART_INFO_PERIOD_WEEK',
        'DASHBOARD.ORDERS_CHART.CHART_INFO_PERIOD_MONTH',
        'DASHBOARD.ORDERS_CHART.CHART_INFO_PERIOD_YEAR',
      ])
      .subscribe((translations) => {
        this.chartInfoPeriod = [
          {
            label:
              translations['DASHBOARD.ORDERS_CHART.CHART_INFO_PERIOD_WEEK'],
            code: '0',
          },
          {
            label:
              translations['DASHBOARD.ORDERS_CHART.CHART_INFO_PERIOD_MONTH'],
            code: '1',
          },
          {
            label:
              translations['DASHBOARD.ORDERS_CHART.CHART_INFO_PERIOD_YEAR'],
            code: '2',
          },
        ];

        // Update the options with the new translations
        this.options = this.chartInfoPeriod.map((item) => ({
          label: item.label,
          command: () => this.changeOption(item),
        }));

        // Update the selectedOption based on the new translations
        // this.selectedOption = this.chartInfoPeriod[0].label;
        this.selectedOption =
          this.chartInfoPeriod[this.selectedOptionId.getValue()].label;
      });
  }

  updateLabels() {
    this.translate
      .get([
        'DASHBOARD.ORDERS_CHART.CHART_LABEL',

        'DASHBOARD.DAYS_OF_WEEK.MONDAY',
        'DASHBOARD.DAYS_OF_WEEK.TUESDAY',
        'DASHBOARD.DAYS_OF_WEEK.WEDNESDAY',
        'DASHBOARD.DAYS_OF_WEEK.THURSDAY',
        'DASHBOARD.DAYS_OF_WEEK.FRIDAY',
        'DASHBOARD.DAYS_OF_WEEK.SATURDAY',
        'DASHBOARD.DAYS_OF_WEEK.SUNDAY',

        'DASHBOARD.MONTHS_OF_YEAR.JANUARY',
        'DASHBOARD.MONTHS_OF_YEAR.FEBRUARY',
        'DASHBOARD.MONTHS_OF_YEAR.MARCH',
        'DASHBOARD.MONTHS_OF_YEAR.APRIL',
        'DASHBOARD.MONTHS_OF_YEAR.MAY',
        'DASHBOARD.MONTHS_OF_YEAR.JUNE',
        'DASHBOARD.MONTHS_OF_YEAR.JULY',
        'DASHBOARD.MONTHS_OF_YEAR.AUGUST',
        'DASHBOARD.MONTHS_OF_YEAR.SEPTEMBER',
        'DASHBOARD.MONTHS_OF_YEAR.OCTOBER',
        'DASHBOARD.MONTHS_OF_YEAR.NOVEMBER',
        'DASHBOARD.MONTHS_OF_YEAR.DECEMBER',
      ])
      .subscribe((translations) => {
        const chartLabel = translations['DASHBOARD.ORDERS_CHART.CHART_LABEL'];

        const translatedWeekLabels = [
          translations['DASHBOARD.DAYS_OF_WEEK.MONDAY'],
          translations['DASHBOARD.DAYS_OF_WEEK.TUESDAY'],
          translations['DASHBOARD.DAYS_OF_WEEK.WEDNESDAY'],
          translations['DASHBOARD.DAYS_OF_WEEK.THURSDAY'],
          translations['DASHBOARD.DAYS_OF_WEEK.FRIDAY'],
          translations['DASHBOARD.DAYS_OF_WEEK.SATURDAY'],
          translations['DASHBOARD.DAYS_OF_WEEK.SUNDAY'],
        ];

        const translatedMonthLabels = [
          translations['DASHBOARD.MONTHS_OF_YEAR.JANUARY'],
          translations['DASHBOARD.MONTHS_OF_YEAR.FEBRUARY'],
          translations['DASHBOARD.MONTHS_OF_YEAR.MARCH'],
          translations['DASHBOARD.MONTHS_OF_YEAR.APRIL'],
          translations['DASHBOARD.MONTHS_OF_YEAR.MAY'],
          translations['DASHBOARD.MONTHS_OF_YEAR.JUNE'],
          translations['DASHBOARD.MONTHS_OF_YEAR.JULY'],
          translations['DASHBOARD.MONTHS_OF_YEAR.AUGUST'],
          translations['DASHBOARD.MONTHS_OF_YEAR.SEPTEMBER'],
          translations['DASHBOARD.MONTHS_OF_YEAR.OCTOBER'],
          translations['DASHBOARD.MONTHS_OF_YEAR.NOVEMBER'],
          translations['DASHBOARD.MONTHS_OF_YEAR.DECEMBER'],
        ];

        this.chartDataArray[0].labels = translatedWeekLabels;
        this.chartDataArray[2].labels = translatedMonthLabels;

        // Update the line chart labels directly
        if (this.selectedOptionId.getValue() === 0) {
          this.lineChartData.labels = translatedWeekLabels;
        } else if (this.selectedOptionId.getValue() === 2) {
          this.lineChartData.labels = translatedMonthLabels;
        }

        this.lineChartData.datasets[0].label = chartLabel;

        // Ensure the chart is updated
        if (this.chart) {
          this.chart.options!.scales!['y']! = {
            title: {
              display: true,
              text: chartLabel,
              padding: 10,
            },
            grid: {
              display: true,
              color: 'rgba(80, 102, 120, 0.25)',
            },
            ticks: {
              padding: 10,
              autoSkip: false,
              maxRotation: 15,
              minRotation: 0.3,
              includeBounds: true,
            },
            min: 0,
          };
          // this.chart.update();
          this.chart.render();
        }
      });
  }

  generateLabelsForLastMonth(): string[] {
    const now = new Date();
    const daysInLastMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0
    ).getDate();

    return Array.from({ length: daysInLastMonth }, (_, i) =>
      (i + 1).toString()
    );
  }

  generateDataForLastMonth(): number[] {
    const now = new Date();
    const daysInLastMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      0
    ).getDate();

    // Generate random data for the example
    return Array.from({ length: daysInLastMonth }, () =>
      Math.floor(Math.random() * 15)
    );
  }

  changeOption(option: any) {
    this.lineChartData.labels = this.chartDataArray[option.code].labels;
    this.lineChartData.datasets[0].data = this.chartDataArray[option.code].data;
    // this.chartData = this.chartDataArray[option.code].data;

    this.selectedOption = option.label;
    this.selectedOptionId.next(Number(option.code));
    // this.updateChartOptions();
    this.chart.update();
  }
}
