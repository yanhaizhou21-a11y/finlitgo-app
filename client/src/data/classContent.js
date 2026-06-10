import CLASS_4_RAW from '../../class4.json';
import CLASS_5_RAW from '../../class5.json';
import CLASS_6_RAW from '../../class6.json';

const CLASS_1_LEVELS = [
  {
    id: 'level-0',
    title: 'The Financial Blueprint',
    description: 'Master the core foundation of personal finance. Learn how to budget, save, and build a strong financial base.',
    items: [
      {
        id: 'c1-l1-1', type: 'lesson', title: 'Understanding Cash Flow', duration: '15 mins',
        content: {
          heading: 'Cash Flow: The Lifeblood of Finance',
          body: [
            '### 1. What is Cash Flow?',
            'Cash flow is the fundamental metric of your financial health. It is the net amount of cash and cash-equivalents being transferred into and out of your personal finances over a specific period (usually a month).',
            '**Positive Cash Flow:** You are making more money than you are spending. This surplus is the seed money for your savings, investments, and future wealth.\n\n**Negative Cash Flow:** You are spending more than you earn. This deficit must be covered by depleting savings or taking on debt (like credit cards), which directly destroys wealth.',
            '### 2. The Mechanics of Income and Expenses',
            'To master cash flow, you must dissect its two main components:',
            '**A. Income (Inflows):**\n- **Active Income:** Money traded for time (salary, hourly wages, freelance income).\n- **Passive/Portfolio Income:** Money earned from investments (dividends, interest, rental income).\n*Pro Tip:* Always plan your budget based on your **Net Income** (take-home pay after taxes and deductions), not your Gross Income.',
            '**B. Expenses (Outflows):**\n- **Fixed Expenses:** Costs that remain constant each month (rent/mortgage, insurance, car payments).\n- **Variable Expenses:** Costs that fluctuate (groceries, dining out, entertainment, gas).\n- **Sinking Funds:** Irregular expenses you should save for monthly (annual car registration, holiday gifts).',
            '### 3. The 50/30/20 Rule: A Practical Framework',
            'A highly effective way to structure your cash flow is the 50/30/20 rule, popularized by Senator Elizabeth Warren:\n\n- **50% for Needs:** Housing, utilities, basic groceries, minimum debt payments, health insurance.\n- **30% for Wants:** Dining out, hobbies, vacations, subscriptions.\n- **20% for Savings & Debt Payoff:** Emergency fund contributions, investing for retirement, extra payments on high-interest debt.',
            '### 4. Actionable Steps to Optimize Cash Flow',
            '1. **Track Everything:** For 30 days, log every single transaction. You cannot manage what you do not measure.\n2. **Audit Subscriptions:** Cancel services you haven\'t used in the last 60 days.\n3. **Negotiate Bills:** Call your internet, insurance, or phone provider and ask for retention discounts.\n4. **Automate:** Set up automatic transfers so that the "20% Savings" leaves your checking account the day you get paid. Pay yourself first!'
          ],
        },
      },
      {
        id: 'c1-l1-2', type: 'lesson', title: 'Emergency Funds', duration: '15 mins',
        content: {
          heading: 'Building Your Financial Safety Net',
          body: [
            '### 1. The Psychology and Purpose of an Emergency Fund',
            'Life is guaranteed to have unexpected, costly events. An emergency fund is a dedicated stash of cash specifically set aside to cover these financial surprises. It acts as an insurance policy for your own life.',
            'Without it, a broken car transmission or a medical emergency becomes a financial crisis, often forcing you into high-interest credit card debt. With it, an emergency becomes a mere inconvenience. It provides immense psychological peace of mind.',
            '### 2. How Much Should You Really Save?',
            'The size of your emergency fund should depend on your specific life circumstances:',
            '**Starter Emergency Fund:** $1,000 to $2,000. This is step one. It covers most minor emergencies (a blown tire, a broken fridge) while you focus on paying off toxic debt.\n\n**Fully Funded (3-6 Months):** Once high-interest debt is gone, aim for 3 to 6 months of *essential living expenses* (Needs only, not Wants).\n- **Aim for 3 months if:** You are single, rent, have no dependents, and have a highly secure job in a high-demand field.\n- **Aim for 6+ months if:** You own a home, have children, work as a freelancer/contractor, or have a medical condition.',
            '### 3. Where Should You Keep This Money?',
            'Your emergency fund must be **liquid** (easily accessible) and **safe** (not exposed to stock market volatility).',
            '- **Do NOT keep it in cash under a mattress:** It loses value to inflation and is vulnerable to theft/fire.\n- **Do NOT invest it in stocks:** The market could crash exactly when you lose your job.\n- **DO keep it in a High-Yield Savings Account (HYSA):** HYSAs are FDIC-insured (safe), easy to transfer from, and currently offer significantly higher interest rates than traditional bank accounts, helping your money keep pace with inflation.',
            '### 4. When to Use It (The Emergency Criteria)',
            'An emergency fund is strictly for emergencies. Ask yourself these three questions before withdrawing:\n1. Is it unexpected? (Christmas happens every December—that is not an emergency).\n2. Is it necessary? (Upgrading to the newest iPhone is not necessary).\n3. Is it urgent? (A leaking roof is urgent; replacing an old but working TV is not).',
            'If you have to use the fund, your immediate next financial goal is to replenish it.'
          ],
        },
      }
    ],
    finalQuiz: {
      id: 'c1-l1-quiz', title: 'Financial Blueprint Checkpoint', questionCount: 2, duration: '2 mins',
      description: 'Test your knowledge on cash flow and emergency funds.',
      questions: [
        { question: 'According to the 50/30/20 rule, how much of your income should go towards savings and debt payoff?', options: ['20%', '30%', '50%', '10%'], correctAnswer: 0 },
        { question: 'Where is the best place to keep a fully-funded emergency fund?', options: ['In the stock market', 'In a High-Yield Savings Account (HYSA)', 'In a cryptocurrency wallet', 'As physical cash at home'], correctAnswer: 1 }
      ]
    }
  }
];

const CLASS_2_LEVELS = [
  {
    id: 'level-0',
    title: 'Investing for Beginners',
    description: 'Learn the basics of investing, different asset classes, and how to start growing your wealth.',
    items: [
      {
        id: 'c2-l1-1', type: 'lesson', title: 'Introduction to Stocks', duration: '20 mins',
        content: {
          heading: 'Owning a Piece of a Company',
          body: [
            '### 1. What is a Stock, Really?',
            'A stock (or equity) is a financial instrument that represents partial ownership in a corporation. When you buy a share of Apple, Microsoft, or a local publicly traded utility, you become a part-owner of that business. You have a claim on part of the corporation\'s assets and earnings.',
            '### 2. How Do You Make Money with Stocks?',
            'There are two primary ways investors build wealth through stocks:',
            '**A. Capital Appreciation:** If the company grows, increases its sales, and becomes more valuable, other investors will be willing to pay more for your shares than you initially paid. You buy at $50, sell at $100, and pocket the difference.\n\n**B. Dividends:** Many mature, profitable companies take a portion of their quarterly earnings and distribute it directly to shareholders as cash. This is passive income. If you reinvest these dividends to buy more shares, you trigger the phenomenon of compound growth.',
            '### 3. The Reality of Risk and Volatility',
            'The stock market is essentially a marketplace of human emotion (fear and greed) reacting to economic data. In the short term, stock prices are incredibly volatile. They can drop 10%, 20%, or even 50% during a recession.',
            'However, historically, over 10, 20, or 30-year periods, the broader stock market (like the S&P 500) has always recovered and grown, averaging around 7-10% annual returns before inflation. The golden rule of stock investing is: **Do not invest money you will need in the next 5 years.**',
            '### 4. Basic Evaluation Metrics',
            '- **Market Capitalization:** The total value of all a company\'s shares. (Share Price × Total Number of Shares). Categorized into Large-Cap, Mid-Cap, and Small-Cap.\n- **P/E Ratio (Price-to-Earnings):** A valuation ratio. It tells you how much investors are willing to pay per dollar of the company\'s earnings. A very high P/E might mean a stock is "expensive" or that high growth is expected.'
          ],
        },
      },
      {
        id: 'c2-l1-2', type: 'lesson', title: 'Bonds, Mutual Funds, and ETFs', duration: '20 mins',
        content: {
          heading: 'Diversification: Do Not Put All Eggs in One Basket',
          body: [
            '### 1. Bonds: Becoming the Lender',
            'While buying stocks makes you an *owner*, buying a bond makes you a *lender*. A bond is a debt security. You are lending money to a government, municipality, or corporation for a set period.',
            'In exchange, they promise to pay you regular interest (the "coupon") and return your original investment (the "principal") on a specific end date (the "maturity date"). Bonds are generally lower risk than stocks, but consequently, they offer lower long-term returns. They act as the "shock absorbers" in a portfolio when the stock market gets bumpy.',
            '### 2. Mutual Funds: Professional Management',
            'Instead of trying to pick the winning stocks yourself (which most professionals fail to do consistently), you can buy a Mutual Fund. This is a giant pool of money collected from thousands of investors, managed by a professional portfolio manager.',
            'The manager uses this money to buy a massive, diversified portfolio of stocks, bonds, or other assets. When you buy a share of the mutual fund, you instantly own a tiny slice of hundreds of companies. *Warning:* Always check the "Expense Ratio"—the annual fee charged by the fund. Active mutual funds often charge 1% or more, which eats massively into your long-term returns.',
            '### 3. ETFs and Index Funds: The Modern Standard',
            'An **Index Fund** is a specific type of mutual fund designed simply to track a specific market index (like the S&P 500), rather than trying to beat it. Because they are run by algorithms instead of highly-paid human managers, their fees are microscopic (often less than 0.05%).',
            'An **ETF (Exchange-Traded Fund)** is essentially an index fund that you can buy and sell throughout the day on the stock market, exactly like a regular stock. For the vast majority of beginner investors, buying broadly diversified, low-cost Index ETFs is the most reliable path to wealth.',
            '### 4. Asset Allocation',
            'Asset allocation is how you divide your portfolio between stocks (higher risk/growth) and bonds (lower risk/stability). A common rule of thumb for beginners is the "110 Rule": Subtract your age from 110. That percentage should be in stocks, the rest in bonds. (e.g., A 30-year-old would hold 80% stocks, 20% bonds).'
          ],
        },
      }
    ],
    finalQuiz: {
      id: 'c2-l1-quiz', title: 'Investing Basics Quiz', questionCount: 2, duration: '2 mins',
      description: 'Test your understanding of basic investment vehicles.',
      questions: [
        { question: 'What is a primary advantage of buying an Index ETF over an actively managed Mutual Fund?', options: ['Guaranteed returns', 'Lower fees (Expense Ratios)', 'Zero volatility', 'They only invest in technology companies'], correctAnswer: 1 },
        { question: 'Which asset acts as a "shock absorber" in a portfolio by providing fixed income and lower risk?', options: ['Growth Stocks', 'Cryptocurrency', 'Bonds', 'Real Estate'], correctAnswer: 2 }
      ]
    }
  }
];

const CLASS_3_LEVELS = [
  {
    id: 'level-0',
    title: 'Wealth Mastery & Freedom',
    description: 'Advanced strategies for wealth preservation, tax optimization, and achieving financial independence.',
    items: [
      {
        id: 'c3-l1-1', type: 'lesson', title: 'The FIRE Movement (Deep Dive)', duration: '25 mins',
        content: {
          heading: 'Financial Independence, Retire Early',
          body: [
            '### 1. The Core Philosophy of FIRE',
            'Traditional retirement implies working until age 65. The FIRE movement challenges this by focusing on intense saving and investing during your 20s, 30s, and 40s to buy back your time decades early.',
            'FIRE is achieved when your passive income (from investments, real estate, or businesses) exceeds your living expenses. At that point, work optional.',
            '### 2. The Flavors of FIRE',
            '- **Lean FIRE:** Retiring on a very modest budget (e.g., $30,000/year). Requires a smaller portfolio but demands extreme frugality.\n- **Fat FIRE:** Retiring with a luxurious lifestyle (e.g., $100,000+/year). Requires a massive portfolio and typically a high-income career.\n- **Barista FIRE:** Saving enough to cover basic living expenses through investments, but choosing to work a low-stress, part-time job (often for health insurance benefits) to cover the rest.\n- **Coast FIRE:** Saving aggressively early in life until your portfolio is large enough that it will grow to your retirement goal using compound interest alone. You can then stop saving and just work enough to cover current expenses.',
            '### 3. The Math: The 4% Rule and Your "FIRE Number"',
            'The Trinity Study determined that a retiree with a portfolio of 50% stocks and 50% bonds could withdraw 4% of their initial portfolio value annually (adjusted for inflation) for 30 years without running out of money.',
            'To find your FIRE Number (the total invested amount you need to retire), simply take your annual expenses and multiply by 25. \n*(Example: If you spend $50,000 a year, your FIRE number is $50,000 × 25 = $1,250,000).*',
            '### 4. Advanced Risks to FIRE',
            '- **Sequence of Returns Risk:** If the stock market crashes in the first 2-3 years of your retirement, drawing down 4% while the portfolio is shrinking can permanently damage your wealth. FIRE practitioners mitigate this by holding a "cash tent" (2-3 years of expenses in cash/bonds).\n- **Healthcare Costs:** In countries like the US, healthcare before traditional retirement age can be exorbitantly expensive and must be heavily factored into the FIRE number.'
          ],
        },
      },
      {
        id: 'c3-l1-2', type: 'lesson', title: 'Estate Planning & Asset Protection', duration: '20 mins',
        content: {
          heading: 'Securing Your Generational Wealth',
          body: [
            '### 1. The Critical Importance of Estate Planning',
            'Many believe estate planning is only for the ultra-rich. This is a dangerous myth. Estate planning is simply the legal process of dictating what happens to your assets, your minor children, and your healthcare decisions if you become incapacitated or pass away.',
            'Without an estate plan, you die "intestate." This means state laws and probate courts decide who gets your money, which can take years, cost thousands in legal fees, and cause massive family disputes.',
            '### 2. The Big Four Estate Documents',
            'A complete estate plan typically consists of four pillars:\n\n1. **Last Will and Testament:** Dictates who receives your assets and, crucially, who becomes the guardian of your minor children.\n2. **Living Trust (Revocable Trust):** A legal entity that holds your assets while you are alive. The major benefit? Assets in a trust completely bypass the expensive, public probate court process upon your death.\n3. **Durable Power of Attorney (Financial):** Appoints a trusted person to manage your finances, pay bills, and access accounts if you are medically incapacitated (e.g., in a coma).\n4. **Healthcare Directive (Living Will / Medical Proxy):** Specifies your wishes regarding life support and appoints someone to make medical decisions for you if you cannot.',
            '### 3. Beneficiary Designations (The Override Rule)',
            'Here is a massive pitfall: The beneficiaries named on your 401(k), IRA, and Life Insurance policies legally **override** what is written in your Will. If your Will says your new spouse gets everything, but your ex-spouse is still listed on your life insurance beneficiary form, the ex-spouse gets the money. Audit your beneficiaries annually.',
            '### 4. Tax Optimization in Wealth Transfer',
            'While the Federal Estate Tax exemption in the US is currently very high (over $10 million), many states have lower estate or inheritance taxes. Strategies like gifting assets while alive, using Irrevocable Trusts, or setting up Donor-Advised Funds for charity can protect your wealth from heavy taxation as it passes to the next generation.'
          ],
        },
      }
    ],
    finalQuiz: {
      id: 'c3-l1-quiz', title: 'Wealth Mastery Quiz', questionCount: 2, duration: '3 mins',
      description: 'Evaluate your knowledge on advanced wealth concepts.',
      questions: [
        { question: 'If your annual living expenses are $60,000, what is your basic FIRE number based on the 4% rule?', options: ['$1,000,000', '$1,200,000', '$1,500,000', '$2,400,000'], correctAnswer: 2 },
        { question: 'Which estate planning document specifically helps your heirs bypass the public and costly probate court process?', options: ['Last Will and Testament', 'Living Trust', 'Healthcare Directive', 'Financial Power of Attorney'], correctAnswer: 1 }
      ]
    }
  }
];

// Classes 4-6: Use imported JSON data
const CLASS_4_LEVELS = CLASS_4_RAW;
const CLASS_5_LEVELS = CLASS_5_RAW;
const CLASS_6_LEVELS = CLASS_6_RAW;

export const CLASS_META = {
  1: {
    id: 1,
    title: 'Financial Foundation & Mindset',
    level: 'Beginner',
    duration: '120 menit',
    modules: 3,
    quizzes: 25,
    levels: CLASS_1_LEVELS,
  },
  2: {
    id: 2,
    title: 'Navigasi Hutang & Kredit Digital',
    level: 'Intermediate',
    duration: '110 menit',
    modules: 3,
    quizzes: 20,
    levels: CLASS_2_LEVELS,
  },
  3: {
    id: 3,
    title: 'Dasar Investasi & Wealth Building',
    level: 'Advanced',
    duration: '130 menit',
    modules: 3,
    quizzes: 20,
    levels: CLASS_3_LEVELS,
  },
  4: {
    id: 4,
    title: 'Keuangan Syariah: Prinsip, Produk & Zakat',
    level: 'Beginner',
    duration: '90 menit',
    modules: 4,
    quizzes: 12,
    levels: CLASS_4_LEVELS,
  },
  5: {
    id: 5,
    title: 'Smart Spending Habits untuk Remaja',
    level: 'Beginner',
    duration: '80 menit',
    modules: 4,
    quizzes: 12,
    levels: CLASS_5_LEVELS,
  },
  6: {
    id: 6,
    title: 'Digital Finance & Fintech: Bank Digital, Crypto & P2P',
    level: 'Intermediate',
    duration: '100 menit',
    modules: 4,
    quizzes: 12,
    levels: CLASS_6_LEVELS,
  },
};

export const CLASS_LEVELS = {
  1: CLASS_1_LEVELS,
  2: CLASS_2_LEVELS,
  3: CLASS_3_LEVELS,
  4: CLASS_4_LEVELS,
  5: CLASS_5_LEVELS,
  6: CLASS_6_LEVELS,
};
