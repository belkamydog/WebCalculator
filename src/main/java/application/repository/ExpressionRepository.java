package application.repository;

import application.model.Expression.Expression;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Component
@Repository
public interface ExpressionRepository extends CrudRepository <Expression, Long> {
}
