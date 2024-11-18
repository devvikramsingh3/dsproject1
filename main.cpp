#include <iostream>
#include <string>
#include <vector>

using namespace std;

// User structure to hold user information
struct User {
    string username;
    string password;
};

// Message structure to hold message details
struct Message {
    string sender;
    string receiver;
    string content;
};

// Chat application class to manage users and messages
class ChatApplication {
private:
    vector<User> users;  // Store users
    vector<Message> messages;  // Store messages
    string loggedInUser;  // Track the currently logged-in user

public:
    // Constructor to initialize loggedInUser to an empty string
    ChatApplication() : loggedInUser("") {}

    // Register a new user
    void registerUser(const string& username, const string& password) {
        for (const auto& user : users) {
            if (user.username == username) {
                cout << "Username already exists!" << endl;
                return;
            }
        }
        users.push_back({username, password});
        cout << "User registered successfully!" << endl;
    }

    // Log in a user
    bool login(const string& username, const string& password) {
        for (const auto& user : users) {
            if (user.username == username && user.password == password) {
                loggedInUser = username;
                cout << "Login successful!" << endl;
                return true;
            }
        }
        cout << "Invalid username or password!" << endl;
        return false;
    }

    // Send a message to another user
    void sendMessage(const string& receiver, const string& content) {
        if (loggedInUser.empty()) {
            cout << "You must log in first!" << endl;
            return;
        }
        messages.push_back({loggedInUser, receiver, content});
        cout << "Message sent to " << receiver << "!" << endl;
    }

    // Receive messages for the logged-in user
    void receiveMessages() {
        if (loggedInUser.empty()) {
            cout << "You must log in first!" << endl;
            return;
        }
        bool found = false;
        cout << "Messages for " << loggedInUser << ":" << endl;
        for (const auto& msg : messages) {
            if (msg.receiver == loggedInUser) {
                cout << msg.sender << ": " << msg.content << endl;
                found = true;
            }
        }
        if (!found) {
            cout << "No new messages." << endl;
        }
    }

    // Get the logged-in user (for display purposes)
    string getLoggedInUser() {
        return loggedInUser;
    }
};

// Main function to interact with the user
int main() {
    ChatApplication chatApp;
    int choice;

    do {
        // Display the menu options
        cout << "\nReal-Time Chat Application" << endl;
        cout << "1. Register" << endl;
        cout << "2. Login" << endl;
        cout << "3. Send Message" << endl;
        cout << "4. Receive Messages" << endl;
        cout << "5. Exit" << endl;
        cout << "Enter your choice: ";
        cin >> choice;
        cin.ignore();  // Ignore the leftover newline character

        // Display the current logged-in user
        if (!chatApp.getLoggedInUser().empty()) {
            cout << "Logged in as: " << chatApp.getLoggedInUser() << endl;
        } else {
            cout << "Not logged in." << endl;
        }

        switch (choice) {
            case 1: {
                // Register a new user
                string username, password;
                cout << "Enter username: ";
                getline(cin, username);
                cout << "Enter password: ";
                getline(cin, password);
                chatApp.registerUser(username, password);
                break;
            }
            case 2: {
                // Log in a user
                string username, password;
                cout << "Enter username: ";
                getline(cin, username);
                cout << "Enter password: ";
                getline(cin, password);
                chatApp.login(username, password);
                break;
            }
            case 3: {
                // Send a message
                string receiver, message;
                cout << "Enter receiver's username: ";
                getline(cin, receiver);
                cout << "Enter your message: ";
                getline(cin, message);
                chatApp.sendMessage(receiver, message);
                break;
            }
            case 4:
                // Receive messages
                chatApp.receiveMessages();
                break;
            case 5:
                cout << "Exiting..." << endl;
                break;
            default:
                cout << "Invalid choice, please try again." << endl;
        }
    } while (choice != 5);

    return 0;
}
