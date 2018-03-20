###############################################################################
# 6.S194 Debugging Exercise
#
# "What to do if you think you might be crazy"
#
# To Run:
#   ruby crazy.rb <credit card number>
#
# Things to think about:
# * Debugging strategies when the code appears correct line-by-line,
#   but the overall output isn't correct.
# * Debugging strategies when you can't easily check
#   the entire function as a black box because of its
#   complexity.
# * Debugging language idioms you (probably) aren't familiar with
#
# Note: 
#   All comments accurately describe the Luhn algorithm, but
#   the code might not necessarily do what the comments say it does.
#
# Note 2:
#   In ruby, to print variable foo, just type:
#      p foo
###############################################################################

# Sums all the digits in an integer.
# Input:
#   number: integer
# Returns:
#   array of integers, each digit in the input
def get_digits_for(number)
  number.to_s.split(//).map {|d| d.to_i}
end

# Performs a Luhn check on a credit card number
# Input:
#   cardnumber: integer The credit card number
# Output:
#   boolean: whether or not the number passes
#   a Luhn check.
def luhn_check(cardnumber)
  # 1. Get the digits of cardnumber
  digits = get_digits_for cardnumber
  p digits

  # 2. The check digit is the rightmost digit
  check_digit = digits[-1]
  p -digits.length
  # 3. Counting from the rightmost digit...
  (-digits.length...-1).each do |idx| 
    p idx
    # 4. For every other digit (starting with the second digit
    #    from the right)
    #    i.e.: [no yes no yes no yes no yes no]
    is_even = !(idx % 2)
    if is_even
      # 5. Double the digit
      digits[idx] *= 2

      # 6. And then replace it with the sum of each digit
      #    in the doubled result
      digits[idx] = (get_digits_for digits[idx]).inject(:+)
    end
  end

  # 7. If the sum of all resulting numbers (they aren't
  #    quite digits anymore) is mod 10, then the card number
  #    is valid.
  valid = !(digits.inject(:+) % 10)
  valid # In Ruby, the last statement is implicitly the return value
end

if __FILE__ == $0
  ccnum = ARGV[0].to_i
  result = luhn_check(ccnum)
  puts "Checking #{ccnum}....#{result}"
end
