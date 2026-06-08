import { expect, test, type Page } from '@playwright/test';

interface Lesson {
  subject: string;
  room: string;
  startMin: number;
  endMin: number;
  cancelled: boolean;
}

async function mockTimetable(page: Page, lessons: Lesson[]) {
  await page.route('https://backenduntis.onrender.com/api/timetable', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ lessons }),
    });
  });
}

test.describe('Feierabend app', () => {
  test('shows the work-day empty state in debug mode', async ({ page }) => {
    await mockTimetable(page, []);

    await page.goto('/?mode=work&week=even');

    await expect(page.getByText('DEBUG MODE ACTIVE')).toBeVisible();
    await expect(page.getByText('TIME UNTIL WORK ENDS')).toBeVisible();
    await expect(page.getByText('Work day - No school lessons today')).toBeVisible();
  });

  test('combines adjacent double lessons into a single schedule entry', async ({ page }) => {
    await mockTimetable(page, [
      {
        subject: 'Math',
        room: '101',
        startMin: 1320,
        endMin: 1365,
        cancelled: false,
      },
      {
        subject: 'Math',
        room: '101',
        startMin: 1365,
        endMin: 1410,
        cancelled: false,
      },
    ]);

    await page.goto('/?mode=school&week=even');

    const scheduleItems = page.locator('.schedule-timeline .schedule-item');
    await expect(scheduleItems).toHaveCount(1);
    await expect(scheduleItems.first()).toContainText('Math');
    await expect(scheduleItems.first()).toContainText('22:00');
    await expect(scheduleItems.first()).toContainText('23:30');
  });

  test('shows a replaced cancellation as one schedule entry and a covered cancellation card', async ({
    page,
  }) => {
    await mockTimetable(page, [
      {
        subject: 'History',
        room: '103',
        startMin: 1260,
        endMin: 1320,
        cancelled: true,
      },
      {
        subject: 'Physics',
        room: '104',
        startMin: 1260,
        endMin: 1320,
        cancelled: false,
      },
    ]);

    await page.goto('/?mode=school&week=even');

    const scheduleItems = page.locator('.schedule-timeline .schedule-item');
    await expect(scheduleItems).toHaveCount(1);
    await expect(scheduleItems.first()).toContainText('Physics');
    await expect(scheduleItems.first()).toContainText('Replaces History');

    const cancelledCards = page.locator('.cancelled-list .cancelled-card');
    await expect(cancelledCards).toHaveCount(1);
    await expect(cancelledCards.first()).toContainText('Covered');
    await expect(cancelledCards.first()).toContainText('Replaced by Physics');
  });
});
