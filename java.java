import java.util.Scanner;

public class PrimeNumbersInRange {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Taking inputs
        int input1 = sc.nextInt();
        int input2 = sc.nextInt();

        // Validation checks
        if (input1 <= 0 || input2 <= 0 || input1 >= input2) {
            System.out.println("Provide valid input");
            return;
        }

        // Printing prime numbers in the range [input1, input2]
        boolean foundPrime = false;
        for (int i = input1; i <= input2; i++) {
            if (isPrime(i)) {
                System.out.print(i + " ");
                foundPrime = true;
            }
        }

        if (!foundPrime) {
            System.out.println("No prime numbers found in the given range");
        }
    }

    // Method to check if a number is prime using a while loop
    public static boolean isPrime(int num) {
        if (num < 2) return false;

        int divisor = 2;
        while (divisor <= Math.sqrt(num)) {
            if (num % divisor == 0) {
                return false;
            }
            divisor++;
        }
        return true;
    }
}
