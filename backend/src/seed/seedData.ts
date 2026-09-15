import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDatabase, disconnectDatabase } from '../config/database';
import { User } from '../models/User';
import { Transaction } from '../models/Transaction';
import { TransactionCategory, TransactionStatus, TransactionType } from '../types';

interface SeedTransactionTemplate {
  date: string;
  amount: number;
  category: TransactionCategory;
  status: TransactionStatus;
  user_id: string;
  user_profile: string;
  transaction_type: TransactionType;
  description: string;
}

const USERS = [
  { id: 'usr_001', profile: 'Sarah Jenkins (Senior Analyst)' },
  { id: 'usr_002', profile: 'Alex Rivera (Finance Director)' },
  { id: 'usr_003', profile: 'Michael Chen (VP Enterprise Sales)' },
  { id: 'usr_004', profile: 'Emily Watson (Head of Marketing)' },
  { id: 'usr_005', profile: 'David Kim (Operations Manager)' },
  { id: 'usr_006', profile: 'Jessica Taylor (Procurement Lead)' }
];

export const RAW_SAMPLE_TRANSACTIONS: SeedTransactionTemplate[] = [
  // --- RECENT MONTH: September 2026 ---
  {
    date: '2026-09-14',
    amount: 18500.00,
    category: 'Sales',
    status: 'Paid',
    user_id: USERS[2].id,
    user_profile: USERS[2].profile,
    transaction_type: 'Revenue',
    description: 'Enterprise Annual Cloud License Renewal - Apex Holdings'
  },
  {
    date: '2026-09-13',
    amount: 3450.00,
    category: 'Software',
    status: 'Paid',
    user_id: USERS[4].id,
    user_profile: USERS[4].profile,
    transaction_type: 'Expense',
    description: 'AWS Production Cluster & S3 Storage Monthly Billing'
  },
  {
    date: '2026-09-12',
    amount: 9200.00,
    category: 'Services',
    status: 'Paid',
    user_id: USERS[0].id,
    user_profile: USERS[0].profile,
    transaction_type: 'Revenue',
    description: 'Financial Risk Assessment Consulting Engagement'
  },
  {
    date: '2026-09-11',
    amount: 5200.00,
    category: 'Marketing',
    status: 'Paid',
    user_id: USERS[3].id,
    user_profile: USERS[3].profile,
    transaction_type: 'Expense',
    description: 'Google Ads & LinkedIn Demand Generation Campaign'
  },
  {
    date: '2026-09-10',
    amount: 1200.50,
    category: 'Operations',
    status: 'Paid',
    user_id: USERS[4].id,
    user_profile: USERS[4].profile,
    transaction_type: 'Expense',
    description: 'Datadog APM & Infrastructure Monitoring Tier'
  },
  {
    date: '2026-09-08',
    amount: 14200.00,
    category: 'Sales',
    status: 'Paid',
    user_id: USERS[2].id,
    user_profile: USERS[2].profile,
    transaction_type: 'Revenue',
    description: 'Fintech Platform Integration Fee - Vertex Capital'
  },
  {
    date: '2026-09-07',
    amount: 2850.00,
    category: 'Travel',
    status: 'Paid',
    user_id: USERS[1].id,
    user_profile: USERS[1].profile,
    transaction_type: 'Expense',
    description: 'Executive Travel - London Financial Summit Flights & Lodging'
  },
  {
    date: '2026-09-06',
    amount: 7800.00,
    category: 'Services',
    status: 'Pending',
    user_id: USERS[0].id,
    user_profile: USERS[0].profile,
    transaction_type: 'Revenue',
    description: 'Q3 Valuation Model Implementation - Horizon Partners'
  },
  {
    date: '2026-09-04',
    amount: 1650.00,
    category: 'Office',
    status: 'Paid',
    user_id: USERS[5].id,
    user_profile: USERS[5].profile,
    transaction_type: 'Expense',
    description: 'Headquarters Ergonomic Workstations & Monitors'
  },
  {
    date: '2026-09-02',
    amount: 6400.00,
    category: 'Sales',
    status: 'Paid',
    user_id: USERS[2].id,
    user_profile: USERS[2].profile,
    transaction_type: 'Revenue',
    description: 'Mid-Market SaaS Subscription - BlueWave Logistics'
  },
  {
    date: '2026-09-01',
    amount: 890.00,
    category: 'Software',
    status: 'Paid',
    user_id: USERS[4].id,
    user_profile: USERS[4].profile,
    transaction_type: 'Expense',
    description: 'Slack Enterprise Grid & Zoom Communication Suite'
  },

  // --- August 2026 ---
  {
    date: '2026-08-29',
    amount: 24500.00,
    category: 'Sales',
    status: 'Paid',
    user_id: USERS[2].id,
    user_profile: USERS[2].profile,
    transaction_type: 'Revenue',
    description: 'Global Asset Management Multi-Seat Platform License'
  },
  {
    date: '2026-08-27',
    amount: 4100.00,
    category: 'Marketing',
    status: 'Paid',
    user_id: USERS[3].id,
    user_profile: USERS[3].profile,
    transaction_type: 'Expense',
    description: 'Money20/20 Fintech Conference Sponsorship & Booth Space'
  },
  {
    date: '2026-08-25',
    amount: 11300.00,
    category: 'Services',
    status: 'Paid',
    user_id: USERS[0].id,
    user_profile: USERS[0].profile,
    transaction_type: 'Revenue',
    description: 'Portfolio Optimization & Algorithmic Audit Advisory'
  },
  {
    date: '2026-08-23',
    amount: 3200.00,
    category: 'Software',
    status: 'Paid',
    user_id: USERS[4].id,
    user_profile: USERS[4].profile,
    transaction_type: 'Expense',
    description: 'Snowflake Data Warehouse Compute Consumption'
  },
  {
    date: '2026-08-20',
    amount: 1950.00,
    category: 'Travel',
    status: 'Paid',
    user_id: USERS[2].id,
    user_profile: USERS[2].profile,
    transaction_type: 'Expense',
    description: 'Sales Pitch Roadshow - New York Institutional Clients'
  },
  {
    date: '2026-08-18',
    amount: 16800.00,
    category: 'Sales',
    status: 'Paid',
    user_id: USERS[2].id,
    user_profile: USERS[2].profile,
    transaction_type: 'Revenue',
    description: 'Institutional Trading Analytics Tier - SilverRock Capital'
  },
  {
    date: '2026-08-15',
    amount: 950.00,
    category: 'Other',
    status: 'Failed',
    user_id: USERS[5].id,
    user_profile: USERS[5].profile,
    transaction_type: 'Expense',
    description: 'Corporate Catering Vendor - Expired Corporate Card'
  },
  {
    date: '2026-08-14',
    amount: 4500.00,
    category: 'Operations',
    status: 'Paid',
    user_id: USERS[4].id,
    user_profile: USERS[4].profile,
    transaction_type: 'Expense',
    description: 'SOC-2 Type II External Compliance Audit Milestone 1'
  },
  {
    date: '2026-08-11',
    amount: 8750.00,
    category: 'Services',
    status: 'Paid',
    user_id: USERS[1].id,
    user_profile: USERS[1].profile,
    transaction_type: 'Revenue',
    description: 'M&A Due Diligence Data Room Setup Fee'
  },
  {
    date: '2026-08-08',
    amount: 1800.00,
    category: 'Office',
    status: 'Paid',
    user_id: USERS[5].id,
    user_profile: USERS[5].profile,
    transaction_type: 'Expense',
    description: 'San Francisco Hub Lease Utility & Gigabit Fiber Connection'
  },
  {
    date: '2026-08-05',
    amount: 13500.00,
    category: 'Sales',
    status: 'Pending',
    user_id: USERS[2].id,
    user_profile: USERS[2].profile,
    transaction_type: 'Revenue',
    description: 'Tier-1 Private Equity Liquidity Tracker Deployment'
  },
  {
    date: '2026-08-02',
    amount: 2200.00,
    category: 'Software',
    status: 'Paid',
    user_id: USERS[4].id,
    user_profile: USERS[4].profile,
    transaction_type: 'Expense',
    description: 'GitHub Enterprise, Docker Hub & CI/CD Pipeline Runners'
  },

  // --- July 2026 ---
  {
    date: '2026-07-30',
    amount: 28900.00,
    category: 'Sales',
    status: 'Paid',
    user_id: USERS[2].id,
    user_profile: USERS[2].profile,
    transaction_type: 'Revenue',
    description: 'Global Tier-2 Bank Real-Time Risk Analytics Deployment'
  },
  {
    date: '2026-07-28',
    amount: 6100.00,
    category: 'Marketing',
    status: 'Paid',
    user_id: USERS[3].id,
    user_profile: USERS[3].profile,
    transaction_type: 'Expense',
    description: 'Quarterly Industry Benchmark Whitepaper Editorial & Distribution'
  },
  {
    date: '2026-07-25',
    amount: 10500.00,
    category: 'Services',
    status: 'Paid',
    user_id: USERS[0].id,
    user_profile: USERS[0].profile,
    transaction_type: 'Revenue',
    description: 'Automated Tax Compliance API Customized Integration'
  },
  {
    date: '2026-07-22',
    amount: 3800.00,
    category: 'Software',
    status: 'Paid',
    user_id: USERS[4].id,
    user_profile: USERS[4].profile,
    transaction_type: 'Expense',
    description: 'MongoDB Atlas Dedicated Cluster M40 Hosting'
  },
  {
    date: '2026-07-19',
    amount: 3400.00,
    category: 'Travel',
    status: 'Paid',
    user_id: USERS[3].id,
    user_profile: USERS[3].profile,
    transaction_type: 'Expense',
    description: 'Fintech Leadership Round Table in Singapore - Travel & Accommodation'
  },
  {
    date: '2026-07-16',
    amount: 15400.00,
    category: 'Sales',
    status: 'Paid',
    user_id: USERS[2].id,
    user_profile: USERS[2].profile,
    transaction_type: 'Revenue',
    description: 'Credit Union Risk Modeling License - Pacific West Credit'
  },
  {
    date: '2026-07-13',
    amount: 1400.00,
    category: 'Operations',
    status: 'Paid',
    user_id: USERS[4].id,
    user_profile: USERS[4].profile,
    transaction_type: 'Expense',
    description: 'Penetration Testing & Third-Party Vulnerability Assessment'
  },
  {
    date: '2026-07-10',
    amount: 5500.00,
    category: 'Services',
    status: 'Paid',
    user_id: USERS[1].id,
    user_profile: USERS[1].profile,
    transaction_type: 'Revenue',
    description: 'Algorithmic Financial Modeling Bootcamp for Client Analysts'
  },
  {
    date: '2026-07-06',
    amount: 1250.00,
    category: 'Office',
    status: 'Paid',
    user_id: USERS[5].id,
    user_profile: USERS[5].profile,
    transaction_type: 'Expense',
    description: 'Pantry Supplies, Coffee Beans & Team Refreshments'
  },
  {
    date: '2026-07-02',
    amount: 7200.00,
    category: 'Sales',
    status: 'Pending',
    user_id: USERS[2].id,
    user_profile: USERS[2].profile,
    transaction_type: 'Revenue',
    description: 'Venture Debt Portfolio Tracking Add-on License'
  },

  // --- June 2026 ---
  {
    date: '2026-06-28',
    amount: 32000.00,
    category: 'Sales',
    status: 'Paid',
    user_id: USERS[2].id,
    user_profile: USERS[2].profile,
    transaction_type: 'Revenue',
    description: 'Boutique Investment Bank Enterprise Multi-Year Retainer'
  },
  {
    date: '2026-06-25',
    amount: 4800.00,
    category: 'Marketing',
    status: 'Paid',
    user_id: USERS[3].id,
    user_profile: USERS[3].profile,
    transaction_type: 'Expense',
    description: 'SEO Optimization, Technical Copywriting & Thought Leadership'
  },
  {
    date: '2026-06-22',
    amount: 12400.00,
    category: 'Services',
    status: 'Paid',
    user_id: USERS[0].id,
    user_profile: USERS[0].profile,
    transaction_type: 'Revenue',
    description: 'Derivatives Margin Optimization Consulting Milestone'
  },
  {
    date: '2026-06-19',
    amount: 3100.00,
    category: 'Software',
    status: 'Paid',
    user_id: USERS[4].id,
    user_profile: USERS[4].profile,
    transaction_type: 'Expense',
    description: 'AWS Lambda, DynamoDB & Route53 DNS Service'
  },
  {
    date: '2026-06-16',
    amount: 2100.00,
    category: 'Travel',
    status: 'Paid',
    user_id: USERS[0].id,
    user_profile: USERS[0].profile,
    transaction_type: 'Expense',
    description: 'Client Onboarding Workshop in Chicago'
  },
  {
    date: '2026-06-13',
    amount: 19000.00,
    category: 'Sales',
    status: 'Paid',
    user_id: USERS[2].id,
    user_profile: USERS[2].profile,
    transaction_type: 'Revenue',
    description: 'Commodity Trading Desk Analytics Expansion - Zenith Resources'
  },
  {
    date: '2026-06-10',
    amount: 450.00,
    category: 'Other',
    status: 'Paid',
    user_id: USERS[5].id,
    user_profile: USERS[5].profile,
    transaction_type: 'Expense',
    description: 'Annual State Corporate Filing and Regulatory Franchise Fees'
  },
  {
    date: '2026-06-07',
    amount: 4900.00,
    category: 'Operations',
    status: 'Paid',
    user_id: USERS[1].id,
    user_profile: USERS[1].profile,
    transaction_type: 'Expense',
    description: 'Corporate Legal Counsel & Master Services Agreement Review'
  },
  {
    date: '2026-06-04',
    amount: 8100.00,
    category: 'Services',
    status: 'Paid',
    user_id: USERS[0].id,
    user_profile: USERS[0].profile,
    transaction_type: 'Revenue',
    description: 'Stress Testing Simulation Engine Customization'
  },
  {
    date: '2026-06-01',
    amount: 1550.00,
    category: 'Office',
    status: 'Paid',
    user_id: USERS[5].id,
    user_profile: USERS[5].profile,
    transaction_type: 'Expense',
    description: 'HQ Janitorial, Greenery Maintenance & HVAC Servicing'
  },

  // --- May 2026 ---
  {
    date: '2026-05-29',
    amount: 21500.00,
    category: 'Sales',
    status: 'Paid',
    user_id: USERS[2].id,
    user_profile: USERS[2].profile,
    transaction_type: 'Revenue',
    description: 'Hedge Fund Quantitative Backtesting Core Engine Access'
  },
  {
    date: '2026-05-26',
    amount: 3900.00,
    category: 'Marketing',
    status: 'Paid',
    user_id: USERS[3].id,
    user_profile: USERS[3].profile,
    transaction_type: 'Expense',
    description: 'Targeted Account Based Marketing Campaign on Financial Times'
  },
  {
    date: '2026-05-23',
    amount: 9800.00,
    category: 'Services',
    status: 'Paid',
    user_id: USERS[1].id,
    user_profile: USERS[1].profile,
    transaction_type: 'Revenue',
    description: 'Financial Data Lake Migration Architecture Advisory'
  },
  {
    date: '2026-05-20',
    amount: 2950.00,
    category: 'Software',
    status: 'Paid',
    user_id: USERS[4].id,
    user_profile: USERS[4].profile,
    transaction_type: 'Expense',
    description: 'Figma Organization, Miro & Lucidchart Product Design Subscriptions'
  },
  {
    date: '2026-05-17',
    amount: 2600.00,
    category: 'Travel',
    status: 'Paid',
    user_id: USERS[1].id,
    user_profile: USERS[1].profile,
    transaction_type: 'Expense',
    description: 'Investor Relations Roadshow in Boston & Toronto'
  },
  {
    date: '2026-05-14',
    amount: 17200.00,
    category: 'Sales',
    status: 'Paid',
    user_id: USERS[2].id,
    user_profile: USERS[2].profile,
    transaction_type: 'Revenue',
    description: 'Private Banking Multi-Currency Cashflow Dashboard Deployment'
  },
  {
    date: '2026-05-11',
    amount: 750.00,
    category: 'Other',
    status: 'Failed',
    user_id: USERS[5].id,
    user_profile: USERS[5].profile,
    transaction_type: 'Expense',
    description: 'International Wire Processing Fee - Currency Conversion Mismatch'
  },
  {
    date: '2026-05-08',
    amount: 3500.00,
    category: 'Operations',
    status: 'Paid',
    user_id: USERS[4].id,
    user_profile: USERS[4].profile,
    transaction_type: 'Expense',
    description: 'Cybersecurity Insurance Annual Policy Premium'
  },
  {
    date: '2026-05-05',
    amount: 6800.00,
    category: 'Services',
    status: 'Paid',
    user_id: USERS[0].id,
    user_profile: USERS[0].profile,
    transaction_type: 'Revenue',
    description: 'Real-Time Fraud Detection Heuristic Tuning'
  },
  {
    date: '2026-05-02',
    amount: 1100.00,
    category: 'Office',
    status: 'Paid',
    user_id: USERS[5].id,
    user_profile: USERS[5].profile,
    transaction_type: 'Expense',
    description: 'Conference Room AV Upgrade (Logitech Rally Plus System)'
  },

  // --- April 2026 ---
  {
    date: '2026-04-28',
    amount: 26000.00,
    category: 'Sales',
    status: 'Paid',
    user_id: USERS[2].id,
    user_profile: USERS[2].profile,
    transaction_type: 'Revenue',
    description: 'Sovereign Wealth Fund Historical Analytics Archive License'
  },
  {
    date: '2026-04-25',
    amount: 5400.00,
    category: 'Marketing',
    status: 'Paid',
    user_id: USERS[3].id,
    user_profile: USERS[3].profile,
    transaction_type: 'Expense',
    description: 'Spring Fintech Podcast Sponsorship & PR Wire Syndication'
  },
  {
    date: '2026-04-21',
    amount: 11800.00,
    category: 'Services',
    status: 'Paid',
    user_id: USERS[0].id,
    user_profile: USERS[0].profile,
    transaction_type: 'Revenue',
    description: 'Automated Portfolio Rebalancing Engine Integration'
  },
  {
    date: '2026-04-18',
    amount: 2800.00,
    category: 'Software',
    status: 'Paid',
    user_id: USERS[4].id,
    user_profile: USERS[4].profile,
    transaction_type: 'Expense',
    description: 'SendGrid Email API, Twilio SMS & PagerDuty Incident Alerting'
  },
  {
    date: '2026-04-14',
    amount: 1800.00,
    category: 'Travel',
    status: 'Paid',
    user_id: USERS[2].id,
    user_profile: USERS[2].profile,
    transaction_type: 'Expense',
    description: 'Annual Finovate Conference Attendance & Client Dinner'
  },
  {
    date: '2026-04-10',
    amount: 15900.00,
    category: 'Sales',
    status: 'Paid',
    user_id: USERS[2].id,
    user_profile: USERS[2].profile,
    transaction_type: 'Revenue',
    description: 'WealthTech Mobile SDK License - Starlight Financial'
  },
  {
    date: '2026-04-06',
    amount: 2200.00,
    category: 'Operations',
    status: 'Paid',
    user_id: USERS[1].id,
    user_profile: USERS[1].profile,
    transaction_type: 'Expense',
    description: 'External Payroll Processing & Tax Reporting Services'
  },
  {
    date: '2026-04-03',
    amount: 7400.00,
    category: 'Services',
    status: 'Paid',
    user_id: USERS[0].id,
    user_profile: USERS[0].profile,
    transaction_type: 'Revenue',
    description: 'Custom Algorithmic Backtesting Benchmark Scripting'
  },

  // --- March 2026 ---
  {
    date: '2026-03-30',
    amount: 34500.00,
    category: 'Sales',
    status: 'Paid',
    user_id: USERS[2].id,
    user_profile: USERS[2].profile,
    transaction_type: 'Revenue',
    description: 'Tier-1 Brokerage Liquidity Heatmap Enterprise Solution'
  },
  {
    date: '2026-03-26',
    amount: 4300.00,
    category: 'Marketing',
    status: 'Paid',
    user_id: USERS[3].id,
    user_profile: USERS[3].profile,
    transaction_type: 'Expense',
    description: 'HubSpot Marketing Hub & Salesforce CRM Integration License'
  },
  {
    date: '2026-03-22',
    amount: 13200.00,
    category: 'Services',
    status: 'Paid',
    user_id: USERS[1].id,
    user_profile: USERS[1].profile,
    transaction_type: 'Revenue',
    description: 'Enterprise Treasury Cash Pool Optimization Assessment'
  },
  {
    date: '2026-03-18',
    amount: 3600.00,
    category: 'Software',
    status: 'Paid',
    user_id: USERS[4].id,
    user_profile: USERS[4].profile,
    transaction_type: 'Expense',
    description: 'Bloomberg B-PIPE Data Stream Monthly Connector'
  },
  {
    date: '2026-03-15',
    amount: 2900.00,
    category: 'Travel',
    status: 'Paid',
    user_id: USERS[0].id,
    user_profile: USERS[0].profile,
    transaction_type: 'Expense',
    description: 'Client Training Onsite at Zurich Banking Headquarters'
  },
  {
    date: '2026-03-12',
    amount: 16400.00,
    category: 'Sales',
    status: 'Paid',
    user_id: USERS[2].id,
    user_profile: USERS[2].profile,
    transaction_type: 'Revenue',
    description: 'Corporate Bond Yield Curve Real-Time Calculator'
  },
  {
    date: '2026-03-08',
    amount: 1850.00,
    category: 'Operations',
    status: 'Paid',
    user_id: USERS[4].id,
    user_profile: USERS[4].profile,
    transaction_type: 'Expense',
    description: 'Automated Disaster Recovery Testing & Backup Replication'
  },
  {
    date: '2026-03-04',
    amount: 6200.00,
    category: 'Services',
    status: 'Pending',
    user_id: USERS[0].id,
    user_profile: USERS[0].profile,
    transaction_type: 'Revenue',
    description: 'ESG Regulatory Reporting Framework Consultancy'
  },
  {
    date: '2026-03-01',
    amount: 980.00,
    category: 'Office',
    status: 'Paid',
    user_id: USERS[5].id,
    user_profile: USERS[5].profile,
    transaction_type: 'Expense',
    description: 'Office Kitchen Equipment Repair & Water Filtration Filters'
  }
];

export async function seedDatabase(): Promise<void> {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('[Seed] Connecting to database...');
      await connectDatabase();
    }

    // 1. Create Demo User
    const demoEmail = 'demo@loopr-dashboard.com';
    const existingDemo = await User.findOne({ email: demoEmail });

    if (existingDemo) {
      console.log(`[Seed] Demo user ${demoEmail} already exists.`);
    } else {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('Demo@123', salt);
      await User.create({
        name: 'Demo Financial Analyst',
        email: demoEmail,
        passwordHash
      });
      console.log(`[Seed] Created Demo User: ${demoEmail} / Demo@123`);
    }

    // 2. Clear and Seed Transactions
    const count = await Transaction.countDocuments();
    if (count > 0) {
      console.log(`[Seed] Database already has ${count} transactions. Refreshing sample dataset...`);
      await Transaction.deleteMany({});
    }

    const inserted = await Transaction.insertMany(RAW_SAMPLE_TRANSACTIONS);
    console.log(`[Seed] Successfully inserted ${inserted.length} realistic financial transactions!`);

    console.log('[Seed] Database seeding completed successfully.');
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error);
    process.exit(1);
  }
}

// If executed directly via CLI: `npm run seed`
if (require.main === module) {
  seedDatabase().then(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
}
