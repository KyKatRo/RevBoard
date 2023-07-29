import psycopg2
from psycopg2 import sql
from faker import Faker
import random
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
from datetime import date

NUM_BUYERS = 10000
NUM_PRODUCTS = 100
NUM_ORDERS = 30000

fake = Faker()

# Load the environment variables from .env file
load_dotenv()

# Now you can access the values
dbname = os.getenv("DBNAME")
user = os.getenv("USER")
password = os.getenv("PASSWORD")
host = os.getenv("HOST")
port = os.getenv("PORT")

print(dbname, user, password, host, port)

# Use the values to connect
conn = psycopg2.connect(
    dbname=dbname,
    user=user,
    password=password,
    host=host,
    port=port
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


def generate_relations():
    cur = conn.cursor()

    tables = [
        """
        CREATE TABLE ordered_by (
            buyer_ID INT,
            order_ID INT,
            PRIMARY KEY (order_ID),
            FOREIGN KEY (buyer_ID) REFERENCES buyers(buyer_ID),
            FOREIGN KEY (order_ID) REFERENCES orders(order_ID)
        );
        """,
        """
        CREATE TABLE earned_by (
            order_ID INT,
            revenue_ID INT,
            PRIMARY KEY (revenue_ID),
            FOREIGN KEY (order_ID) REFERENCES orders(order_ID),
            FOREIGN KEY (revenue_ID) REFERENCES revenue(revenue_ID)
        );
        """,
        """
        CREATE TABLE bought (
            order_ID INT,
            product_ID INT,
            PRIMARY KEY (order_ID, product_ID),
            FOREIGN KEY (order_ID) REFERENCES orders(order_ID),
            FOREIGN KEY (product_ID) REFERENCES products(product_ID)
        );
        """,
        """
        CREATE TABLE manufacturing_cost (
            product_ID INT,
            expense_ID INT,
            PRIMARY KEY (expense_ID),
            FOREIGN KEY (product_ID) REFERENCES products(product_ID),
            FOREIGN KEY (expense_ID) REFERENCES expenses(expense_ID)
        );
        """,
        """
        CREATE TABLE generated_by (
            order_ID INT,
            campaign_ID INT,
            PRIMARY KEY (order_ID, campaign_ID),
            FOREIGN KEY (order_ID) REFERENCES orders(order_ID),
            FOREIGN KEY (campaign_ID) REFERENCES campaigns(campaign_ID)
        );
        """,
        """
        CREATE TABLE campaign_cost (
            campaign_ID INT,
            expense_ID INT,
            PRIMARY KEY (expense_ID),
            FOREIGN KEY (campaign_ID) REFERENCES campaigns(campaign_ID),
            FOREIGN KEY (expense_ID) REFERENCES expenses(expense_ID)
        );
        """
    ]

    for table in tables:
        cur.execute(table)

    # commit the transactions
    conn.commit()

    # close the cursor and connection
    cur.close()
    conn.close()


def create_database_entries():
    # Open a cursor to perform database operations
    cur = conn.cursor()

    current_year = date.today().year

    # Generate data for each table
    for i in range(NUM_BUYERS):
        # Buyers
        buyer_id = i
        name = fake.name()
        email = fake.email()
        password = fake.password()
        cur.execute("INSERT INTO Buyers (buyer_Id, buyer_name, email, password) VALUES (%s, %s, %s, %s)",
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
        order_date = fake.date_between(start_date=f"{current_year}-01-01", end_date=f"{current_year}-12-31")
        quantity = random.randint(1, 10)
        cur.execute("INSERT INTO Orders (order_Id, order_date, quantity) VALUES (%s, %s, %s)",
                    (order_id, order_date, quantity))

    for i in range(100):
        # Revenue
        revenue_id = i
        revenue_date = fake.date_between(start_date=f"{current_year}-01-01", end_date=f"{current_year}-12-31")
        total_revenue = round(random.uniform(10.5, 200.5), 2)
        cur.execute("INSERT INTO Revenue (revenueId, date, totalRevenue) VALUES (%s, %s, %s)",
                    (revenue_id, revenue_date, total_revenue))


        # Expenses
        expense_id = i
        expense_date = fake.date_between(start_date=f"{current_year}-01-01", end_date=f"{current_year}-12-31")
        expense_category = fake.word()
        amount = round(random.uniform(10.5, 200.5), 2)
        operational_type = random.choice(['Operational', 'Non-Operational'])
        cur.execute(
            "INSERT INTO Expenses (expenseId, date, expenseCategory, amount, operationalType) VALUES "
            "(%s, %s, %s, %s, %s)", (expense_id, expense_date, expense_category, amount, operational_type))

        # Campaigns
        campaign_id = i
        name = fake.word()
        campaign_start_date = fake.date_between(start_date=f"{current_year}-01-01", end_date=f"{current_year}-12-31")
        campaign_end_date = campaign_start_date + timedelta(days=random.randint(1, 30))
        target = random.randint(1, 10)
        cur.execute(
            "INSERT INTO Campaigns (campaign_Id, name, campaignStartDate, campaignEndDate, target) VALUES (%s, %s, %s, %s, %s)",
            (campaign_id, name, campaign_start_date, campaign_end_date, target))

        """
    
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

    """

    # Make the changes to the database persistent
    conn.commit()

    # Close communication with the database
    cur.close()
    conn.close()


if __name__ == '__main__':
    create_database_entries()
