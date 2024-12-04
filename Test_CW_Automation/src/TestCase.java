import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;


public class TestCase {

	public static void main(String[] args) {
		System.setProperty("webdriver.chrome.driver",
				System.getProperty("user.dir") + "/src/resources/" + "chromedriver.exe");
		WebDriver testDriver = new ChromeDriver();
		testDriver.get("https://www.google.com/");
		testDriver.getCurrentUrl();
	}

}
