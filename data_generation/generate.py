import psycopg2
from psycopg2 import sql
from faker import Faker
import random
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
import random
from datetime import date
from tqdm import tqdm
import time

NUM_BUYERS = 10  # 000
NUM_PRODUCTS = 10  # 0
NUM_ORDERS = 30  # 000
NUM_CAMPAIGNS = 1  # 0

fake = Faker()

# Load the environment variables from .env file
load_dotenv()

# Now you can access the values
dbname = os.getenv("DBNAME")
user = os.getenv("USER")
password = os.getenv("PASSWORD")
host = os.getenv("HOST")
port = os.getenv("PORT")

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


def generate_tables():
    cur = conn.cursor()

    tables = [
        """
        CREATE TABLE Buyers (
            buyer_id BIGINT NOT NULL,
            buyer_name VARCHAR(50) NOT NULL,
            email VARCHAR(40) UNIQUE NOT NULL,
            password VARCHAR(40),
            PRIMARY KEY (buyer_id)
        );
        """,
        """
        CREATE TABLE Products (
            product_id BIGINT NOT NULL,
            product_name VARCHAR(50) NOT NULL,
            product_price DECIMAL(10,2),
            PRIMARY KEY(product_id)
        );
        """,
        """
        CREATE TABLE Orders (
            order_id BIGINT NOT NULL,
            order_date DATE,
            quantity INT,
            PRIMARY KEY(order_id)
        );
        """,
        """
        CREATE TABLE Revenue (
            revenue_id BIGINT NOT NULL,
            revenue_date DATE,
            totalRevenue DECIMAL(10,2),
            PRIMARY KEY(revenue_id)
        );
        """,
        """
        CREATE TABLE Expenses (
            expense_id BIGINT NOT NULL,
            expense_date DATE,
            expenseCategory VARCHAR(40) NOT NULL,
            amount DECIMAL(10,2),
            operationalType VARCHAR(20) CHECK (operationalType IN ('operational', 'non-operational')),
            PRIMARY KEY(expense_id)
        );
        """,
        """
        CREATE TABLE Campaigns (
            campaign_id BIGINT NOT NULL,
            campaign_name VARCHAR(50) NOT NULL,
            campaignStartDate DATE NOT NULL,
            campaignEndDate DATE NOT NULL,
            target DECIMAL(10,2),
            PRIMARY KEY(campaign_id)
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


def clear_table(cursor, table_name):
    try:
        cursor.execute(f"DELETE FROM {table_name}")
        print(f"Cleared {table_name} table.")
    except Exception as e:
        print(f"Error clearing {table_name} table: {e}")


def clear_all_tables():
    try:
        cursor = conn.cursor()

        tables_to_clear = [
            'Ordered_by',
            'Earned_by',
            'Bought',
            'Manufacturing_cost',
            'Generated_by',
            'campaign_cost',
            'Buyers',
            'Products',
            'Orders',
            'Revenue',
            'Expenses',
            'Campaigns',
        ]

        for table in tables_to_clear:
            clear_table(cursor, table)

        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Error while clearing tables: {e}")


def generate_fake_product_name():
    prefixes = ['Tech', 'Glo', 'Smart', 'Eco', 'Pro', 'Ultra', 'Max', 'Nano', 'i', 'Aqua']
    suffixes = ['tron', 'gen', 'ify', 'lite', 'X', 'Plus', 'Vista', 'Core', 'Duo', 'Zoom']
    words = ['Widget', 'Gadget', 'Device', 'Tool', 'Appliance', 'Machine', 'System']

    # Choose a random prefix, word, and suffix to combine into a product name
    prefix = random.choice(prefixes)
    word = random.choice(words)
    suffix = random.choice(suffixes)

    # Combine the parts to form the final product name
    product_name = f"{prefix}{word}{suffix}"

    return product_name


def generate_unique_product_names(count):
    unique_names = set()

    while len(unique_names) < count:
        fake_product_name = generate_fake_product_name()
        unique_names.add(fake_product_name)

    return list(unique_names)


def create_database_entries():
    clear_all_tables()

    # Use the values to connect
    conn = psycopg2.connect(
        dbname=dbname,
        user=user,
        password=password,
        host=host,
        port=port
    )

    # Open a cursor to perform database operations
    cur = conn.cursor()

    current_year = date.today().year

    # Generate data for each table
    print("\n \n Creating Buyer Entries")
    for i in tqdm(range(NUM_BUYERS)):
        # Buyers
        buyer_id = i
        name = fake.name()
        email = fake.email()
        user_password = fake.password()
        cur.execute("INSERT INTO Buyers (buyer_Id, buyer_name, email, password) VALUES (%s, %s, %s, %s)",
                    (buyer_id, name, email, user_password))

    time.sleep(0.1)

    unique_product_names = generate_unique_product_names(NUM_PRODUCTS)

    price_log = [None]*NUM_PRODUCTS

    print("\n \n Creating Product Entries")
    for i in tqdm(range(NUM_PRODUCTS)):
        # Products
        product_id = i
        product_name = unique_product_names[i]
        product_price = round(random.uniform(10.5, 200.5), 2)
        price_log[i] = product_price
        cur.execute("INSERT INTO Products (product_Id, product_name, product_price) VALUES (%s, %s, %s)",
                    (product_id, product_name, product_price))

        # Expenses
        expense_id = i
        expense_date = fake.date_between(start_date=date(current_year, 1, 1), end_date=date(current_year, 12, 31))
        expense_category = "manufacturing_cost"
        amount = round((product_price/2) * random.randint(300, 3000), 2)
        operational_type = 'non-operational'
        cur.execute(
            "INSERT INTO Expenses (expense_Id, expense_date, expenseCategory, amount, operationalType) VALUES "
            "(%s, %s, %s, %s, %s)", (expense_id, expense_date, expense_category, amount, operational_type))

        # Manufacturing_cost
        cur.execute("INSERT INTO Manufacturing_cost (product_ID, expense_ID) VALUES (%s, %s)",
                    (i, i))

    time.sleep(0.1)

    campaign_history = [None]*NUM_CAMPAIGNS

    print("\n \n Creating Campaign Entries")
    for i in tqdm(range(NUM_CAMPAIGNS)):
        # Campaigns
        campaign_id = i
        name = fake.word()
        campaign_start_date = fake.date_between(start_date=date(current_year, 1, 1),
                                                end_date=date(current_year, 12, 31))
        campaign_end_date = campaign_start_date + timedelta(days=random.randint(1, 30))

        campaign_history[i] = (i, campaign_start_date, campaign_end_date)

        target = random.randint(1000, 100000)
        cur.execute(
            "INSERT INTO Campaigns (campaign_Id, campaign_name, campaignStartDate, campaignEndDate, target) VALUES "
            "(%s, %s, %s, %s, %s)", (campaign_id, name, campaign_start_date, campaign_end_date, target))

        # Expenses
        expense_id = i+NUM_PRODUCTS
        expense_date = campaign_start_date
        expense_category = 'campaign_cost'
        amount = round(random.uniform(10000, 100000), 2)
        operational_type = 'operational'
        cur.execute(
            "INSERT INTO Expenses (expense_Id, expense_date, expenseCategory, amount, operationalType) VALUES "
            "(%s, %s, %s, %s, %s)", (expense_id, expense_date, expense_category, amount, operational_type))

        # campaign_cost
        cur.execute("INSERT INTO campaign_cost (campaign_ID, expense_ID) VALUES (%s, %s)",
                    (i, i))

    time.sleep(0.1)

    print("\n \n Creating Order Entries")
    for i in tqdm(range(NUM_ORDERS)):
        # Orders
        order_id = i
        order_date = fake.date_between(start_date=date(current_year, 1, 1), end_date=date(current_year, 12, 31))
        quantity = random.randint(1, 10)
        cur.execute("INSERT INTO Orders (order_Id, order_date, quantity) VALUES (%s, %s, %s)",
                    (order_id, order_date, quantity))

        # Ordered_by
        cur.execute("INSERT INTO Ordered_by (buyer_ID, order_ID) VALUES (%s, %s)",
                    (random.randint(0, NUM_BUYERS-1), i))

        product_selection = random.randint(0, NUM_PRODUCTS-1)
        # Bought
        cur.execute("INSERT INTO Bought (order_ID, product_ID) VALUES (%s, %s)",
                    (i, product_selection))

        # Revenue
        revenue_id = i
        revenue_date = order_date
        total_revenue = quantity * price_log[product_selection]
        cur.execute("INSERT INTO Revenue (revenue_Id, revenue_date, totalRevenue) VALUES (%s, %s, %s)",
                    (revenue_id, revenue_date, total_revenue))

        # Earned_by
        cur.execute("INSERT INTO Earned_by (order_ID, revenue_ID) VALUES (%s, %s)",
                    (i, i))

        for num, campaign_start, campaign_end in campaign_history:
            if random.randint(0, 1) and campaign_start <= order_date <= campaign_end:
                # Campaign_orders
                cur.execute("INSERT INTO Generated_by (order_ID, campaign_ID) VALUES (%s, %s)",
                            (i, num))
                break

    # Make the changes to the database persistent
    conn.commit()

    # Close communication with the database
    cur.close()
    conn.close()


if __name__ == '__main__':
    create_database_entries()
