import java.util.Arrays; 
import java.util.List;
 import
import java.util.Scanner;

public class variables {

    public static int sum(int a, int b) {
        return a + b;
    }

    public static void main(String args[]) {
        {
            List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);
             // Find the first number greater than 3 
             Optional<Integer> result = numbers.stream() .filter(n -> n > 3) .findFirst(); 
             result.ifPresent(System.out::println);

        }

    }
