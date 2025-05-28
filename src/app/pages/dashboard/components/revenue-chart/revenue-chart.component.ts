import { Component, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
    CardModule,
    CalendarModule,
    FormsModule,
    MenuModule,
    TranslateModule,
  ],
  templateUrl: './revenue-chart.component.html',
  styleUrl: './revenue-chart.component.scss',
})
export class RevenueChartComponent {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          padding: 10,
          autoSkip: true,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Revenue MDL',
          padding: 10,
        },
        grid: {
          display: true,
          color: 'rgba(80, 102, 120, 0.25)',
        },
        ticks: {
          padding: 10,
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          title: function (tooltipItems: any[]) {
            //Show name of the month for last month dataset
            const dataIndex = tooltipItems[0].dataIndex;
            const labels = tooltipItems[0].chart.data.labels;
            const datasetLength = tooltipItems[0].dataset.data.length;

            if (datasetLength >= 28) {
              const dateLabel = labels[dataIndex];
              const monthIndex = new Date().getMonth() - 1;
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
      data: [1200, 1456, 8750, 0, 12000, 0, 20456],
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
      data: [0, 0, 1000, 1300, 30500, 24000, 8755, 0, 35768, 3400, 1200, 57324],
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
  public barChartLabels: any = this.chartDataArray[0].labels;

  public barChartData: ChartData = {
    labels: this.barChartLabels,
    datasets: [
      {
        label: 'Revenue',
        data: this.chartData,
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(16, 185, 129, 0.7)',
        hoverBorderColor: 'rgba(16, 185, 129, 1)',
      },
    ],
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = false;

  chartInfoPeriod: any[] = [
    { label: 'Last 7 days', code: '0' },
    { label: 'Last month', code: '1' },
    { label: 'Last year', code: '2' },
  ];

  selectedOption: string = this.chartInfoPeriod[0].label;
  options: any[] = [];
  selectedOptionId = new BehaviorSubject(0);

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.options = this.chartInfoPeriod.map((item) => ({
      label: item.label,
      command: () => this.changeOption(item),
    }));

    // Initial setup of options
    this.updateTranslations();
    // this.updateLabels();

    // Subscribe to language change events
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateTranslations();
      this.updateLabels();
    });
  }

  ngAfterViewInit() {
    this.updateLabels();
  }

  updateTranslations() {
    this.translate
      .get([
        'DASHBOARD.REVENUE_CHART.CHART_INFO_PERIOD_WEEK',
        'DASHBOARD.REVENUE_CHART.CHART_INFO_PERIOD_MONTH',
        'DASHBOARD.REVENUE_CHART.CHART_INFO_PERIOD_YEAR',
      ])
      .subscribe((translations) => {
        this.chartInfoPeriod = [
          {
            label:
              translations['DASHBOARD.REVENUE_CHART.CHART_INFO_PERIOD_WEEK'],
            code: '0',
          },
          {
            label:
              translations['DASHBOARD.REVENUE_CHART.CHART_INFO_PERIOD_MONTH'],
            code: '1',
          },
          {
            label:
              translations['DASHBOARD.REVENUE_CHART.CHART_INFO_PERIOD_YEAR'],
            code: '2',
          },
        ];

        // Update the options with the new translations
        this.options = this.chartInfoPeriod.map((item) => ({
          label: item.label,
          command: () => this.changeOption(item),
        }));

        // Update the selectedOption based on the new translations
        this.selectedOption =
          this.chartInfoPeriod[this.selectedOptionId.getValue()].label;
      });
  }

  updateLabels() {
    this.translate
      .get([
        'DASHBOARD.REVENUE_CHART.CHART_LABEL',

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
        const chartLabel = translations['DASHBOARD.REVENUE_CHART.CHART_LABEL'];

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

        // Update the bar chart labels directly
        if (this.selectedOptionId.getValue() === 0) {
          this.barChartData.labels = translatedWeekLabels;
        } else if (this.selectedOptionId.getValue() === 2) {
          this.barChartData.labels = translatedMonthLabels;
        }

        this.barChartData.datasets[0].label = chartLabel;

        // Ensure the chart is updated
        if (this.chart) {
          this.chart.options!.scales!['y']! = {
            beginAtZero: true,
            title: {
              display: true,
              text: chartLabel + ' MDL',
              padding: 10,
            },
            grid: {
              display: true,
              color: 'rgba(80, 102, 120, 0.25)',
            },
            ticks: {
              padding: 10,
            },
          };
          // this.chart.update();
          this.chart.render();
        }
      });
  }

  generateLabelsForLastMonth(): string[] {
    const now = new Date();
    // const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
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
      Math.floor(Math.random() * 40000)
    );
  }

  changeOption(option: any) {
    this.barChartData.labels = this.chartDataArray[option.code].labels;
    this.barChartData.datasets[0].data = this.chartDataArray[option.code].data;

    this.selectedOption = option.label;
    this.selectedOptionId.next(Number(option.code));

    this.chart.update();
  }
}
