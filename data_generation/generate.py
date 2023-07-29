import psycopg2
from psycopg2 import sql
from faker import Faker
import random
from datetime import datetime, timedelta

NUM_BUYERS = 10000
NUM_PRODUCTS = 100
NUM_ORDERS = 30000

fake = Faker()

# Connect to your postgres DB
conn = psycopg2.connect(
    dbname="main",
    user="postgres",
    password="fJNfRiQb4tXyEYi",
    host="revboard.fly.dev",
    port="5432"
)


def create_test_entry():
    # Open a cursor to perform database operations
    cur = conn.cursor()

    # Execute a query
    cur.execute("INSERT INTO test (id, name, age, occupation) VALUES (%s, %s, %s, %s)", (4, 'Billy', 20, 'Student'))

    # Make the changes to the database persistent
    conn.commit()

    # Close communication with the database
    cur.close()
    conn.close()


def test_database_query():
    # Open a cursor to perform database operations
    cur = conn.cursor()

    # Execute a query
    cur.execute("SELECT * FROM test")

    # Retrieve query results
    records = cur.fetchall()
    print(records)

    # Close communication with the database
    cur.close()
    conn.close()


def create_database_entries():
    # Open a cursor to perform database operations
    cur = conn.cursor()

    cur.execute("INSERT INTO test (id, name, age, occupation) VALUES (%s, %s, %s, %s)", (4, 'Billy', 20, 'Student'))

    # Generate data for each table
    for i in range(NUM_BUYERS):
        # Buyers
        buyer_id = i
        name = fake.name()
        email = fake.email()
        password = fake.password()
        cur.execute("INSERT INTO Buyers (buyer_Id, name, email, password) VALUES (%s, %s, %s, %s)",
                    (buyer_id, name, email, password))
    
    for i in range(NUM_PRODUCTS):
        # Products
        product_id = i
        product_name = fake.word()
        product_price = round(random.uniform(10.5, 200.5), 2)
        cur.execute("INSERT INTO Products (product_Id, product_name, product_price) VALUES (%s, %s, %s)",
                    (product_id, product_name, product_price))

    for i in range(NUM_ORDERS):
        # Orders
        order_id = i
        order_date = fake.date_between(start_date='-1y', end_date='today')
        quantity = random.randint(1, 10)
        cur.execute("INSERT INTO Orders (order_Id, order_date, quantity) VALUES (%s, %s, %s)",
                    (order_id, order_date, quantity))
    
        # Revenue
        revenue_id = i
        date = fake.date_between(start_date='-1y', end_date='today')
        total_revenue = round(random.uniform(10.5, 200.5), 2)
        cur.execute("INSERT INTO Revenue (revenueId, date, totalRevenue) VALUES (%s, %s, %s)",
                    (revenue_id, date, total_revenue))
    
        # Expenses
        expense_id = i
        date = fake.date_between(start_date='-1y', end_date='today')
        expense_category = fake.word()
        amount = round(random.uniform(10.5, 200.5), 2)
        operational_type = random.choice(['Operational', 'Non-Operational'])
        cur.execute(
            "INSERT INTO Expenses (expenseId, date, expenseCategory, amount, operationalType) VALUES "
            "(%s, %s, %s, %s, %s)", (expense_id, date, expense_category, amount, operational_type))
    
        # Campaigns
        campaign_id = i
        name = fake.word()
        campaign_start_date = fake.date_between(start_date='-1y', end_date='today')
        campaign_end_date = campaign_start_date + timedelta(days=random.randint(1, 30))
        target = random.randint(1, 10)
        cur.execute(
            "INSERT INTO Campaigns (campaign_Id, name, campaignStartDate, campaignEndDate, target) VALUES (%s, %s, %s, %s, %s)",
            (campaign_id, name, campaign_start_date, campaign_end_date, target))
    
    # Create relationships
    for i in range(30000):
        # Ordered_by
        cur.execute("INSERT INTO Ordered_by (buyer_ID, order_ID) VALUES (%s, %s)",
                    (random.randint(0, NUM_BUYERS-1), random.randint(0, NUM_ORDERS-1)))
    
        # Earned_by
        cur.execute("INSERT INTO Earned_by (order_ID, revenue_ID) VALUES (%s, %s)",
                    (random.randint(0, NUM_ORDERS-1), random.randint(0, NUM_ORDERS-1)))
    
        # Bought
        cur.execute("INSERT INTO Bought (order_ID, product_ID) VALUES (%s, %s)",
                    (random.randint(0, 29999), random.randint(0, 29999)))
    
        # Manufacturing_cost
        cur.execute("INSERT INTO Manufacturing_cost (product_ID, expense_ID) VALUES (%s, %s)",
                    (random.randint(0, 29999), random.randint(0, 29999)))
    
        # Generated_by
        cur.execute("INSERT INTO Generated_by (order_ID, campaign_ID) VALUES (%s, %s)",
                    (random.randint(0, 29999), random.randint(0, 29999)))
    
        # campaign_cost
        cur.execute("INSERT INTO campaign_cost (campaign_ID, expense_ID) VALUES (%s, %s)",
                    (random.randint(0, 29999), random.randint(0, 29999)))


    # Make the changes to the database persistent
    conn.commit()

    # Close communication with the database
    cur.close()
    conn.close()


if __name__ == '__main__':
    test_database_query()
