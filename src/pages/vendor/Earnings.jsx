import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { vendorEarnings } from '../../data/mockData';
import './Dashboard.css';

const VendorEarnings = () => {
    return (
        <div className="vendor-dashboard-page">
            <Navbar role="vendor" />

            <main className="dashboard-content">
                <div className="container-wide">
                    <div className="dashboard-header">
                        <h1>Earnings Overview</h1>
                        <p>Track your revenue and financial performance</p>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: '#10B98120', color: '#10B981' }}>
                                <DollarSign size={24} />
                            </div>
                            <div className="stat-info">
                                <p className="stat-label">Total Revenue</p>
                                <h3 className="stat-value">${vendorEarnings.totalEarnings.toLocaleString()}</h3>
                                <p className="stat-delta positive">
                                    <ArrowUpRight size={16} /> 12% vs last month
                                </p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: '#F59E0B20', color: '#F59E0B' }}>
                                <TrendingUp size={24} />
                            </div>
                            <div className="stat-info">
                                <p className="stat-label">Pending Payouts</p>
                                <h3 className="stat-value">${vendorEarnings.pendingPayments.toLocaleString()}</h3>
                                <p className="stat-delta">Processing: 3 items</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon" style={{ background: '#00D9D920', color: '#00D9D9' }}>
                                <DollarSign size={24} />
                            </div>
                            <div className="stat-info">
                                <p className="stat-label">Avg. Service Price</p>
                                <h3 className="stat-value">$1,250</h3>
                                <p className="stat-delta positive">
                                    <ArrowUpRight size={16} /> 5% increase
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-section">
                        <h2>Transaction History</h2>
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Customer</th>
                                        <th>Service</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Invoice</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendorEarnings.recentTransactions.map((transaction) => (
                                        <tr key={transaction.id}>
                                            <td>{transaction.date}</td>
                                            <td>{transaction.customer}</td>
                                            <td>{transaction.service}</td>
                                            <td className="amount">${transaction.amount.toLocaleString()}</td>
                                            <td>
                                                <span className={`status-badge ${transaction.status}`}>
                                                    {transaction.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="btn-view">Download</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
                .stat-delta {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                    font-size: 0.85rem;
                    margin-top: 0.5rem;
                    color: var(--text-tertiary);
                }
                .stat-delta.positive {
                    color: var(--success);
                }
                .stat-delta.negative {
                    color: var(--error);
                }
            `}</style>
        </div>
    );
};

export default VendorEarnings;
