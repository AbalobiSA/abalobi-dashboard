import { AbalobiDashboardPage } from './app.po';

describe('abalobi-dashboard App', () => {
  let page: AbalobiDashboardPage;

  beforeEach(() => {
    page = new AbalobiDashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
